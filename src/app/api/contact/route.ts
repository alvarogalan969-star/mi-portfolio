// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

export async function POST(/*_req: Request*/) {
  // placeholder; en el Paso 6 implementaremos validación y envío
  return NextResponse.json({ ok: true });
}
