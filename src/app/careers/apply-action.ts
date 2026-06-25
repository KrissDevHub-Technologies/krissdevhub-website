"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  github_url: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  linkedin_url: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  resume_url: z.string().url("Invalid Resume Link").or(z.string().min(10, "Please provide a valid file link or details")),
  cover_letter: z.string().min(20, "Cover letter must be at least 20 characters"),
  role_slug: z.string().min(1, "Role slug is required"),
});

export type FormState = {
  success: boolean;
  error?: string;
};

export async function applyForJob(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      github_url: formData.get("github_url"),
      linkedin_url: formData.get("linkedin_url"),
      resume_url: formData.get("resume_url"),
      cover_letter: formData.get("cover_letter"),
      role_slug: formData.get("role_slug"),
    };

    const parsed = schema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      };
    }

    const supabase = await createClient();
    const { error } = await (supabase as any).from("career_applications").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      github_url: parsed.data.github_url || null,
      linkedin_url: parsed.data.linkedin_url || null,
      resume_url: parsed.data.resume_url,
      cover_letter: parsed.data.cover_letter,
      role_slug: parsed.data.role_slug,
      status: "new",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error("Failed to save application to database");
    }

    return { success: true };
  } catch (err: any) {
    console.error("Application action error:", err);
    return {
      success: false,
      error: "Something went wrong while submitting. Please email hello@krissdevhub.com directly.",
    };
  }
}
