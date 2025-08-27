// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type NormalizedPayload = {
  nombre: string;     // normalizamos name -> nombre
  email: string;
  mensaje: string;    // normalizamos message -> mensaje
  subject?: string;
  company?: string;   // honeypot (si lo reactivas alguna vez)
};

const isEmail = (s: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const toStr = (v: unknown): string =>
  typeof v === "string" ? v : "";

const escapeHtml = (s: string): string =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// Lee el body y normaliza campos (soporta JSON y FormData; ES o EN)
async function readNormalizedPayload(req: Request): Promise<NormalizedPayload> {
  const ct = req.headers.get("content-type") ?? "";

  if (ct.includes("application/json")) {
    const raw = (await req.json()) as Record<string, unknown>;

    const nombre = toStr(raw.nombre ?? raw.name);
    const email = toStr(raw.email);
    const subject = toStr(raw.subject);
    const mensaje = toStr(raw.mensaje ?? raw.message);
    const company = toStr(raw.company);

    return { nombre, email, subject: subject || undefined, mensaje, company: company || undefined };
  }

  // FormData
  const fd = await req.formData();

  // Helpers sin any
  const getFD = (key: string): string => {
    const v = fd.get(key);
    return typeof v === "string" ? v : "";
  };

  const nombre = getFD("nombre") || getFD("name");
  const email = getFD("email");
  const subject = getFD("subject");
  const mensaje = getFD("mensaje") || getFD("message");
  const company = getFD("company");

  return {
    nombre,
    email,
    subject: subject || undefined,
    mensaje,
    company: company || undefined,
  };
}

export async function POST(req: Request) {
  try {
    // Env vars obligatorias
    const apiKey = process.env.RESEND_API_KEY;
    const mailDomain = process.env.MAIL_DOMAIN;
    const to = process.env.CONTACT_TO_EMAIL;

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

    // Payload normalizado (sin any)
    const data = await readNormalizedPayload(req);

    // Honeypot (si lo usas en el futuro)
    if (data.company && data.company.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const nombre = data.nombre.trim();
    const email = data.email.trim();
    const mensaje = data.mensaje.trim();
    const asunto = data.subject?.trim();

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

    const resend = new Resend(apiKey);

    const from = `Álvaro <contact@${mailDomain}>`;
    const subject = asunto
      ? `(${asunto}) ${nombre} — Contacto desde el portfolio`
      : `Nuevo mensaje desde el portfolio: ${nombre}`;

    const text = `Nombre: ${nombre}
Email: ${email}
${asunto ? `Asunto: ${asunto}\n` : ""}Mensaje:
${mensaje}`.trim();

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.6;color:#111;">
        <h2 style="margin:0 0 12px;">Nuevo mensaje desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${asunto ? `<p><strong>Asunto:</strong> ${escapeHtml(asunto)}</p>` : ""}
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
      replyTo: email, // camelCase correcto en SDK
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "No se pudo enviar el mensaje." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: unknown) {
    // err es unknown para cumplir lint; lo mostramos de forma segura
    console.error("Contact API error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}
