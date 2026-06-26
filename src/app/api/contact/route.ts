import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message, service, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase config environment variables are missing");
      return NextResponse.json({ error: "Database configuration is missing" }, { status: 500 });
    }

    const supabase = createClient<Database>(supabaseUrl, supabaseKey);

    const { error: dbError } = await (supabase as any).from("contacts").insert({
      name,
      email,
      company: company || null,
      message,
      service: service || null,
      budget: budget || null,
    });

    if (dbError) {
      console.error("Supabase insert error details:", dbError);
      return NextResponse.json(
        { error: `Database insert failed: ${dbError.message || "Unknown error"}` },
        { status: 500 }
      );
    }

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "KrissDevHub <noreply@krissdevhub.dev>",
            to: ["hello@krissdevhub.dev"],
            subject: `New inquiry from ${name}`,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#050505;color:#fff;border-radius:12px;">
                <h2 style="color:#3b82f6;margin-bottom:16px;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
                ${service ? `<p><strong>Service:</strong> ${service}</p>` : ""}
                ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ""}
                <div style="margin-top:16px;padding:16px;background:#111;border-radius:8px;">
                  <p style="color:#a1a1aa;margin:0 0 8px;">Message:</p>
                  <p style="margin:0;">${message}</p>
                </div>
              </div>
            `,
          }),
        });
        if (!resendRes.ok) {
          console.warn("Resend email delivery failed:", await resendRes.text());
        }
      } catch (emailErr) {
        console.error("Failed to send email via Resend:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact API handler error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
