// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";           // ✅ usar runtime Node
// export const dynamic = "force-dynamic"; // opcional: evita intentos de prerender

type Payload = {
  nombre: string;
  email: string;
  mensaje: string;
  company?: string; // honeypot
};

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
    const apiKey = process.env.RESEND_API_KEY;
    const mailDomain = process.env.MAIL_DOMAIN;
    const to = process.env.CONTACT_TO_EMAIL;

    // ✅ Valida env vars (si falta algo, no seguimos)
    if (!apiKey || !mailDomain || !to) {
      console.error("ENV MISSING", {
        hasApiKey: Boolean(apiKey),
        hasMailDomain: Boolean(mailDomain),
        hasTo: Boolean(to),
      });
      return NextResponse.json(
        { ok: false, error: "Config del servidor incompleta." },
        { status: 500 }
      );
    }

    // ✅ Instanciar dentro del handler (no en top-level)
    const resend = new Resend(apiKey);

    const data = (await req.json()) as Payload;

    // Honeypot anti-spam
    if (data.company && data.company.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const nombre = (data?.nombre ?? "").trim();
    const email = (data?.email ?? "").trim();
    const mensaje = (data?.mensaje ?? "").trim();

    // Validaciones
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

    const from = `Álvaro <contact@${mailDomain}>`;
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
      replyTo: email, // ✅ camelCase correcto
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
