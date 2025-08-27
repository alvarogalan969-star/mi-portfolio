import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  nombre: string;
  email: string;
  mensaje: string;
  company?: string; // honeypot
};

const resend = new Resend(process.env.RESEND_API_KEY);

function isEmail(str: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;

    // Honeypot anti-spam
    if (data.company && data.company.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const nombre = (data?.nombre ?? "").trim();
    const email = (data?.email ?? "").trim();
    const mensaje = (data?.mensaje ?? "").trim();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Email no válido." },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL!;
    const mailDomain = process.env.MAIL_DOMAIN!;
    const from = `Álvaro <contact@${mailDomain}>`; // usa tu dominio verificado
    const subject = `Nuevo mensaje desde el portfolio: ${nombre}`;

    const text = `
Nombre: ${nombre}
Email: ${email}

Mensaje:
${mensaje}
`.trim();

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.6;color:#111;">
        <h2 style="margin:0 0 12px;">Nuevo mensaje desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px;">
          ${escapeHtml(mensaje)}
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email, // podrás responderle directo desde tu bandeja
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "No se pudo enviar el mensaje." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}
