import 'server-only';

export type BrevoEmailInput = {
  to: string;
  toName?: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function sendBrevoEmail(input: BrevoEmailInput): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const senderEmail = process.env.BREVO_FROM_EMAIL?.trim();
  const senderName = process.env.BREVO_FROM_NAME?.trim() || 'Portfolio profesional';

  if (!apiKey || !senderEmail) {
    throw new Error('BREVO_API_KEY and BREVO_FROM_EMAIL must be configured.');
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: input.to, ...(input.toName ? { name: input.toName } : {}) }],
      ...(input.replyTo ? { replyTo: { email: input.replyTo } } : {}),
      subject: input.subject,
      htmlContent: input.html,
      ...(input.text ? { textContent: input.text } : {}),
    }),
  });

  const payload: unknown = await response.json().catch(() => null);
  const code = isRecord(payload) && typeof payload.code === 'string' ? payload.code : undefined;

  if (!response.ok) {
    throw new Error(
      'Brevo API request failed (HTTP ' + response.status + (code ? ', ' + code : '') + ').',
    );
  }
}
