"use server";

import { createClient } from "@/lib/supabase/server";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const BUCKET = "resumes";

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload a resume file to Supabase Storage.
 * Returns the public (signed-URL-style) path stored in DB.
 */
export async function uploadResume(
  file: File,
  candidateEmail: string
): Promise<UploadResult> {
  // Validate size
  if (file.size > MAX_SIZE_BYTES) {
    return { success: false, error: "File exceeds 10 MB limit." };
  }

  // Validate type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      success: false,
      error: "Only PDF and DOCX files are allowed.",
    };
  }

  try {
    const supabase = await createClient();
    const ext = file.type === "application/pdf" ? "pdf" : "docx";
    const safeName = candidateEmail.replace(/[^a-zA-Z0-9]/g, "_");
    const timestamp = Date.now();
    const path = `${safeName}_${timestamp}.${ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return { success: false, error: "Failed to upload resume." };
    }

    // Return the storage path (not a signed URL — admins download on demand)
    return { success: true, url: path };
  } catch (err) {
    console.error("uploadResume error:", err);
    return { success: false, error: "Unexpected upload error." };
  }
}

/**
 * Generate a signed download URL for a resume (for admin use).
 * Signed URLs expire in 60 minutes.
 */
export async function getResumeDownloadUrl(
  path: string
): Promise<string | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, 3600);

    if (error) {
      console.error("Signed URL error:", error);
      return null;
    }

    return data.signedUrl;
  } catch {
    return null;
  }
}
