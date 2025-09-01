export interface Env {
  ASSETS: Fetcher;
  TURNSTILE_SECRET?: string;
  EMAIL_TO?: string;
  EMAIL_FROM?: string; // optional override
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/contact') {
      return handleContact(request, env);
    }

    // Fallback to serving static assets
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleContact(request: Request, env: Env): Promise<Response> {
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

    // Basic validation
    if (honeypot) return json({ ok: true }); // silently accept bots
    if (!name || !email || !message) return json({ ok: false, error: 'Missing required fields' }, 400);

    // Verify Turnstile (if secret configured)
    if (env.TURNSTILE_SECRET) {
      const ip = request.headers.get('CF-Connecting-IP') || undefined;
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: token,
          remoteip: ip ?? '',
        }),
      });
      const ver = (await verify.json()) as { success: boolean };
      if (!ver.success) return json({ ok: false, error: 'Captcha failed' }, 400);
    }

    // Prepare MailChannels payload
    const to = env.EMAIL_TO || 'm.liakou@outlook.com';
    const from = env.EMAIL_FROM || 'no-reply@atelier13interiors.com';
    const subject = `New Contact Form Submission — ${name}`;

    const payload = {
      personalizations: [
        {
          to: [{ email: to }],
        },
      ],
      from: { email: from, name: 'Atelier 13 Website' },
      reply_to: { email, name },
      subject,
      content: [
        {
          type: 'text/plain',
          value: `Name: ${name}\nEmail: ${email}\nDate: ${date}\nIP: ${request.headers.get('CF-Connecting-IP') || ''}\n\nMessage:\n${message}`,
        },
      ],
    };

    const resp = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return json({ ok: false, error: 'Email send failed', details: errText }, 502);
    }

    return json({ ok: true });
  } catch (e: any) {
    return json({ ok: false, error: e?.message || 'Unknown error' }, 500);
  }
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

