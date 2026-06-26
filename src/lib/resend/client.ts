import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactNotification({
  name,
  email,
  company,
  message,
  service,
}: {
  name: string;
  email: string;
  company?: string;
  message: string;
  service?: string;
}) {
  return resend.emails.send({
    from: "KrissDevHub <noreply@krissdevhub.dev>",
    to: ["hello@krissdevhub.dev"],
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #050505; color: #fff; border-radius: 12px;">
        <h2 style="color: #3b82f6; margin-bottom: 24px;">New Contact Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #a1a1aa;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #a1a1aa;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
          ${company ? `<tr><td style="padding: 8px 0; color: #a1a1aa;">Company</td><td style="padding: 8px 0;">${company}</td></tr>` : ""}
          ${service ? `<tr><td style="padding: 8px 0; color: #a1a1aa;">Service</td><td style="padding: 8px 0;">${service}</td></tr>` : ""}
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #111; border-radius: 8px;">
          <p style="color: #a1a1aa; margin: 0 0 8px 0;">Message:</p>
          <p style="margin: 0;">${message}</p>
        </div>
      </div>
    `,
  });
}

export async function sendContactConfirmation({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return resend.emails.send({
    from: "KrissDevHub <noreply@krissdevhub.dev>",
    to: [email],
    subject: "We received your message — KrissDevHub Technologies",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #050505; color: #fff; border-radius: 12px;">
        <h2 style="color: #3b82f6;">Thanks, ${name}!</h2>
        <p style="color: #a1a1aa; line-height: 1.6;">We've received your message and will get back to you within 1 business day.</p>
        <p style="color: #a1a1aa; line-height: 1.6;">In the meantime, feel free to explore our <a href="https://krissdevhub.dev/case-studies" style="color: #3b82f6;">case studies</a> or follow us on <a href="https://twitter.com/krissdevhub" style="color: #3b82f6;">Twitter</a>.</p>
        <p style="color: #52525b; margin-top: 32px; font-size: 14px;">— The KrissDevHub Team</p>
      </div>
    `,
  });
}
