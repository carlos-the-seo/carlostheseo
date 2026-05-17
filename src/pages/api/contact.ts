import type { APIRoute } from 'astro';
import { env as cfEnv } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const RESEND_API_KEY = (cfEnv as any).RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Server misconfigured: no API key' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    let body: Record<string, string>;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const { name, email, website, service, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const html = `
      <h2>New contact from carlosmorones.com</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
      ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Carlos Morones <hello@send.carlosmorones.com>',
        to: ['seo@carlosmorones.com'],
        reply_to: email,
        subject: `New inquiry from ${name}${service ? ` — ${service}` : ''}`,
        html,
      }),
    });

    if (!res.ok) {
      const resendError = await res.json().catch(() => ({}));
      return new Response(JSON.stringify({ error: 'Resend rejected', detail: resendError }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'Worker crashed', detail: e?.message ?? String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
