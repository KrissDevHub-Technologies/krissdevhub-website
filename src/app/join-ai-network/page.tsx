import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { constructMetadata } from "@/lib/metadata";
import { getOpenJobs } from "@/lib/ats/jobs";
import { JoinNetworkClient } from "./join-network-client";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Join AI Talent Network",
  description:
    "Apply to become an AI professional at KrissDevHub. We are building the next generation of AI Workforce Solutions.",
  canonical: "https://krissdevhub.dev/join-ai-network",
});

export default async function JoinAiNetworkPage() {
  const jobs = await getOpenJobs({ department: "AI Workforce" });

  return (
    <div className="min-h-screen pt-32 pb-32 bg-[#090909]">
      <div className="mx-auto max-w-2xl px-6 sm:px-10">
        <Link
          href="/ai-workforce"
          className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-8 font-space-grotesk"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to AI Workforce
        </Link>

        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-2 block">
            Workforce Application
          </span>
          <h1 className="text-3xl font-bold text-white font-space-grotesk">
            Join AI Talent Network
          </h1>
          <p className="text-sm text-white/40 mt-2 font-light">
            Fill in the details below to apply as an AI Trainer, Evaluator, RLHF Specialist, Prompt Engineer, 
            or Data Annotator. We will store your profile in our database and contact you as soon as matching campaigns start.
          </p>
        </div>

        <div className="bg-[#0d0d0d] border border-white/[0.05] p-8 rounded-2xl">
          <JoinNetworkClient jobs={jobs} />
        </div>
      </div>
    </div>
  );
}
