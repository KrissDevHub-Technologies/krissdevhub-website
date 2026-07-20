import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      company_name,
      company_email,
      website,
      company_size,
      country,
      linkedin_company,
      contact_name,
      designation,
      contact_email,
      phone,
      linkedin_profile,
      partner_type,
      services = [],
      years_in_business,
      team_size,
      portfolio,
      enterprise_clients,
      partnership_reason,
      additional_notes,
      agree_terms,
    } = body;

    // Validate required fields
    if (
      !company_name ||
      !company_email ||
      !country ||
      !contact_name ||
      !contact_email ||
      !phone ||
      !partner_type
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!agree_terms) {
      return NextResponse.json(
        { error: "You must agree to be contacted by KrissDevHub Technologies." },
        { status: 400 }
      );
    }

    // Initialize Supabase Admin / Service Client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase config environment variables are missing");
      return NextResponse.json(
        { error: "Database configuration is missing." },
        { status: 500 }
      );
    }

    const supabase = createClient<Database>(supabaseUrl, supabaseKey);

    const cleanContactEmail = contact_email.trim().toLowerCase();
    const cleanCompanyEmail = company_email.trim().toLowerCase();

    // Check for existing duplicate submission by contact_email OR company_email
    const { data: existingPartners, error: checkError } = await (supabase as any)
      .from("partners")
      .select("id, contact_email, company_email")
      .or(`contact_email.ilike.${cleanContactEmail},company_email.ilike.${cleanCompanyEmail}`);

    if (checkError) {
      console.error("Supabase query error while checking duplicates:", checkError);
    } else if (existingPartners && existingPartners.length > 0) {
      return NextResponse.json(
        { error: "An application with this email address has already been submitted." },
        { status: 400 }
      );
    }

    // Initial history log
    const initialHistory = [
      {
        from: null,
        to: "New",
        timestamp: new Date().toISOString(),
        actor: "Applicant",
        note: "Partner application submitted",
      },
    ];

    // Save complete application into Supabase
    const { data: insertedData, error: dbError } = await (supabase as any)
      .from("partners")
      .insert({
        company_name,
        company_email: cleanCompanyEmail,
        website: website || null,
        company_size: company_size || null,
        country,
        linkedin_company: linkedin_company || null,
        contact_name,
        designation: designation || null,
        contact_email: cleanContactEmail,
        phone,
        linkedin_profile: linkedin_profile || null,
        partner_type,
        services: Array.isArray(services) ? services : [],
        years_in_business: years_in_business || null,
        team_size: team_size || null,
        portfolio: portfolio || null,
        enterprise_clients: enterprise_clients || null,
        partnership_reason: partnership_reason || null,
        additional_notes: additional_notes || null,
        status: "New",
        admin_notes: "",
        history: initialHistory,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase insert error details:", dbError);
      return NextResponse.json(
        { error: `Failed to submit application: ${dbError.message || "Database error"}` },
        { status: 500 }
      );
    }

    // Email Automation via Resend API
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        // 1. Candidate confirmation email
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "KrissDevHub <noreply@krissdevhub.dev>",
            to: [cleanContactEmail],
            subject: "Partner Application Received",
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #09090b; color: #ffffff; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="margin-bottom: 24px;">
                  <h2 style="color: #3b82f6; font-size: 20px; font-weight: 700; margin: 0 0 16px 0;">Partner Application Received</h2>
                </div>
                <p style="color: #e4e4e7; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Hello ${contact_name},</p>
                <p style="color: #e4e4e7; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Thank you for applying to become a partner with KrissDevHub Technologies.</p>
                <p style="color: #e4e4e7; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">We have successfully received your application.</p>
                <p style="color: #e4e4e7; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">Our team will carefully review your submission and contact you within <strong>2–3 business days</strong>.</p>
                <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
                <p style="color: #a1a1aa; font-size: 13px; margin: 0;">Regards,<br/><strong style="color: #ffffff;">KrissDevHub Technologies</strong></p>
              </div>
            `,
          }),
        });

        // 2. Internal team notification email
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "KrissDevHub <noreply@krissdevhub.dev>",
            to: ["hello@krissdevhub.dev"],
            subject: `New Partner Application: ${company_name} (${partner_type})`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #050505; color: #fff; border-radius: 12px;">
                <h2 style="color: #3b82f6; margin-bottom: 16px;">New Partner Program Application</h2>
                <p><strong>Company:</strong> ${company_name}</p>
                <p><strong>Contact Person:</strong> ${contact_name} (${designation || "N/A"})</p>
                <p><strong>Contact Email:</strong> ${cleanContactEmail}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>Partner Type:</strong> ${partner_type}</p>
                <p><strong>Services:</strong> ${(services || []).join(", ") || "None specified"}</p>
                <div style="margin-top:16px;padding:16px;background:#111;border-radius:8px;">
                  <p style="color:#a1a1aa;margin:0 0 8px;"><strong>Reason for Partnership:</strong></p>
                  <p style="margin:0;">${partnership_reason || "N/A"}</p>
                </div>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send Resend emails:", emailErr);
      }
    }

    return NextResponse.json({ success: true, partner: insertedData });
  } catch (err: any) {
    console.error("Partner API handler error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
