import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { bio, contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name}, ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const sections = [
  {
    href: "/who-am-i",
    label: "Who am I",
    blurb:
      "A person is best understood by their camera roll. Mine is over a terabyte.",
  },
  {
    href: "/experiences",
    label: "Experiences",
    blurb:
      "Every role since 2018, in order, with the receipts attached.",
  },
  {
    href: "/impact",
    label: "Impact",
    blurb: "Papers, repos, prototypes and talks. The proof, not the story.",
  },
];

/**
 * Structured data. Google reads this directly, which is how the site earns a
 * knowledge panel style result for her name rather than a plain blue link.
 */
function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    description: site.description,
    image: `${site.url}/images/ananya-caricature.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boston",
      addressRegion: "MA",
      addressCountry: "US",
    },
    sameAs: [contact.linkedin, contact.github],
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <Hero />

      <section aria-labelledby="intro-heading" className="pb-24">
        <Container width="wide">
          <h2 id="intro-heading" className="sr-only">
            Introduction
          </h2>

          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:col-start-1">
              {bio.map((line, index) => (
                <Reveal key={line} delay={index * 0.08}>
                  <p className="text-lede mb-4 max-w-[52ch] text-ink-soft">
                    {line}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href="/experiences">View my work</Button>
                  <Button href="/contact#resume" variant="outline">
                    Download resume
                  </Button>
                  <Button href="/contact" variant="quiet">
                    Get in touch
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="sections-heading" className="border-t border-dune py-20">
        <Container width="wide">
          <h2 id="sections-heading" className="text-micro text-ocean-soft">
            The rest of it
          </h2>

          <ul className="mt-10 grid gap-px bg-dune sm:grid-cols-3">
            {sections.map((section, index) => (
              <Reveal as="li" key={section.href} delay={index * 0.08}>
                <div className="h-full bg-sand p-8 transition-colors duration-500 hover:bg-shell">
                  <h3 className="display-face text-title text-ink">
                    {section.label}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-[0.95rem] leading-relaxed text-ink-soft">
                    {section.blurb}
                  </p>
                  <div className="mt-6">
                    <ArrowLink href={section.href} tone="coral">
                      Open
                    </ArrowLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
