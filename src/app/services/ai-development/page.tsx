import Link from "next/link";
import { Brain, ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { CtaSection } from "@/features/home/cta-section";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "AI Development",
  description:
    "LLM integrations, RAG systems, AI agents, and vector databases. We build AI-native features that are production-ready and solve real problems.",
  canonical: "https://krissdevhub.com/services/ai-development",
});

const offerings = [
  {
    title: "LLM Integration",
    description:
      "Connect OpenAI, Anthropic, Google Gemini, or open-source models to your product. We handle prompting, context management, streaming, and cost optimization.",
    features: ["OpenAI GPT-4o", "Anthropic Claude", "Llama fine-tuning", "Streaming responses", "Token optimization"],
  },
  {
    title: "RAG Systems",
    description:
      "Retrieval-Augmented Generation lets your AI answer questions from your own data. We build the ingestion pipeline, embedding strategy, and retrieval logic.",
    features: ["Document ingestion", "Chunking strategies", "Semantic search", "Pinecone / pgvector", "Reranking"],
  },
  {
    title: "AI Agents",
    description:
      "Autonomous agents that reason, plan, and use tools to complete complex tasks. From customer service agents to internal knowledge workers.",
    features: ["Tool use / function calling", "Multi-step reasoning", "Memory systems", "Agent orchestration", "Monitoring"],
  },
  {
    title: "Vector Databases",
    description:
      "We design and implement vector storage and retrieval strategies optimized for your use case — whether it's semantic search, recommendations, or memory.",
    features: ["Pinecone", "pgvector", "Weaviate", "Qdrant", "Hybrid search"],
  },
];

export default function AiDevelopmentPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <GradientBlob className="w-[600px] h-[500px] -top-40 -left-40 opacity-40" color="blue" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Brain className="w-4 h-4 text-white/80" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                AI Development
              </span>
            </div>
          </ScrollReveal>
          <TextReveal
            text="AI that earns its place in your product"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6"
            as="h1"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed mb-8">
              We build AI features that work reliably in production — not demos that impress investors but fail users. From LLM integrations to full autonomous agents.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all group"
            >
              Discuss your AI project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 pb-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offerings.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-[#121212] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 h-full">
                  <h2 className="text-lg font-semibold text-white mb-2">{item.title}</h2>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{item.description}</p>
                  <ul className="space-y-1.5">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/50">
                        <Check className="w-3.5 h-3.5 text-white/60 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
