"use server";

import "server-only";
import { contactSchema } from "@/lib/schemas/contactSchema";
import { headers } from "next/headers";

// Rate limit en memoria (Para producción se recomienda Upstash Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export async function sendContactForm(formData: unknown) {
  // 1. RATE LIMITING por IP
  // Nota: En Next.js 14 headers() es síncrono
  const headerList = headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  
  const now = Date.now();
  const userRate = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  // Resetea el conteo cada 60 segundos
  if (now - userRate.lastReset > 60000) {
    userRate.count = 0;
    userRate.lastReset = now;
  }

  if (userRate.count >= 3) {
    return { success: false, error: "rateLimitExceeded" };
  }

  userRate.count++;
  rateLimitMap.set(ip, userRate);

  // 2. VALIDACIÓN SERVIDOR CON ZOD
  const result = contactSchema.safeParse(formData);

  if (!result.success) {
    return { success: false, error: "invalidData" };
  }

  const { name, email, affair, consultation, hp_company, formTimestamp } = result.data;

  // 3. SEGURO HONEYPOT: Si un bot llenó el campo trampa, simulamos un éxito falso
  if (hp_company && hp_company.length > 0) {
    return { success: true };
  }

  // 4. CONTROL DE TIEMPO: Menos de 3 segundos de llenado = Bot
  if (now - formTimestamp < 3000) {
    return { success: false, error: "submittedTooFast" };
  }

  // 5. ENVÍO SEGURO DESDE EL SERVIDOR A FORMSPREE
  try {
    const response = await fetch("https://formspree.io/f/mjvapnag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        subject: affair,
        message: consultation
      })
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: "serviceError" };
    }
  } catch (err) {
    return { success: false, error: "serverError" };
  }
}