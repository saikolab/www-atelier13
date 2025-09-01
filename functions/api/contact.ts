export const onRequestPost: PagesFunction<{
  TURNSTILE_SECRET: string;
  EMAIL_TO: string;
  EMAIL_FROM?: string;
}> = async ({ request, env }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/x-www-form-urlencoded') && !contentType.includes('multipart/form-data')) {
      return json({ ok: false, error: 'Unsupported content type' }, 400);
    }

    const form = await request.formData();
    const name = (form.get('name') || '').toString().slice(0, 200);
    const email = (form.get('email') || '').toString().slice(0, 200);
    const date = (form.get('date') || '').toString().slice(0, 100);
    const message = (form.get('message') || '').toString().slice(0, 5000);
    const honeypot = (form.get('website') || '').toString();
    const token = (form.get('cf-turnstile-response') || '').toString();

    if (honeypot) return json({ ok: true });
    if (!name || !email || !message) return json({ ok: false, error: 'Missing required fields' }, 400);

    // Verify Turnstile if secret is present
    if (env.TURNSTILE_SECRET) {
      const ip = request.headers.get('CF-Connecting-IP') || undefined;
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip ?? '' }),
      });
      const ver = (await verify.json()) as { success: boolean };
      if (!ver.success) return json({ ok: false, error: 'Captcha failed' }, 400);
    }

    const to = env.EMAIL_TO || 'm.liakou@outlook.com';
    const from = env.EMAIL_FROM || 'no-reply@atelier13interiors.com';
    const subject = `New Contact Form Submission — ${name}`;

    const payload = {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: 'Atelier 13 Website' },
      reply_to: { email, name },
      subject,
      content: [
        {
          type: 'text/plain',
          value: `Name: ${name}\nEmail: ${email}\nDate: ${date}\n\nMessage:\n${message}`,
        },
      ],
    };

    const resp = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      const details = await resp.text();
      return json({ ok: false, error: 'Email send failed', details }, 502);
    }
    return json({ ok: true });
  } catch (e: any) {
    return json({ ok: false, error: e?.message || 'Unknown error' }, 500);
  }
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

