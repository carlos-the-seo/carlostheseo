import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const runtime = (locals as { runtime?: { env?: Record<string, string> } }).runtime;
  const env = runtime?.env ?? {};
  const RESEND_API_KEY = env.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }

  const { name, email, website, service, message } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const html = `
    <h2>New contact from carlostheseo.com</h2>
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
      from: 'carlostheseo.com <hello@carlostheseo.com>',
      to: ['seo@marketingempiregroup.com'],
      reply_to: email,
      subject: `New inquiry from ${name}${service ? ` — ${service}` : ''}`,
      html,
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
