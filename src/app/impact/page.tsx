import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { VariableText } from "@/components/motion/VariableText";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Container } from "@/components/ui/Container";
import { impactItems } from "@/content/impact";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Published research, live projects, prototypes and talks by Ananya Shah. The public artifacts, with links.",
  alternates: { canonical: "/impact" },
  // Nothing to index until the entries land. Flip this to true in the same
  // commit that fills src/content/impact.ts.
  robots: { index: false, follow: true },
};

/**
 * NOT BUILT YET, on purpose. Waiting on sign off for the timeline interaction
 * before the card grid gets designed.
 *
 * The page already reads from src/content/impact.ts, so entries render the
 * moment they exist. The grid below is a first pass at the card, not the final
 * masonry treatment.
 */
export default function ImpactPage() {
  return (
    <section className="pt-32 pb-24 sm:pt-40">
      <Container width="wide">
        <p className="text-micro text-ocean-soft">Impact</p>

        <h1 className="mt-6">
          <VariableText as="span" className="display-face text-display block text-ink">
            The proof
          </VariableText>
        </h1>

        {impactItems.length === 0 ? (
          <Reveal delay={0.1}>
            <p className="text-lede mt-10 max-w-[48ch] text-ink-soft">
              This section is next. Papers, repos, prototypes and talks, each one
              a card with a link straight to the artifact.
            </p>
            <p className="mt-4 max-w-[48ch] text-[0.95rem] text-ink-faint">
              Held until the timeline interaction is approved, so the card design
              can inherit whatever we settle on there.
            </p>
            <p className="mt-10">
              <Link
                href="/experiences"
                className="text-[0.95rem] font-medium text-coral underline underline-offset-4"
              >
                See the timeline instead
              </Link>
            </p>
          </Reveal>
        ) : (
          <ul className="mt-14 grid gap-px bg-dune sm:grid-cols-2 lg:grid-cols-3">
            {impactItems.map((item, index) => (
              <Reveal as="li" key={item.id} delay={(index % 3) * 0.07}>
                <article className="flex h-full flex-col bg-sand p-6">
                  <PhotoFrame
                    photo={item.thumbnail}
                    slotLabel={item.type}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="aspect-16/10 w-full"
                  />
                  <p className="text-micro mt-5 text-coral">{item.type}</p>
                  <h2 className="display-face mt-2 text-[1.3rem] leading-tight tracking-tight text-ink">
                    {item.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-baseline gap-1.5 text-[0.875rem] font-medium text-ink transition-colors hover:text-coral"
                  >
                    {item.linkLabel ?? "Open"}
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
