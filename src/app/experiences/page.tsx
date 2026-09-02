import type { Metadata } from "next";
import { Timeline } from "@/components/experiences/Timeline";
import { Reveal } from "@/components/motion/Reveal";
import { VariableText } from "@/components/motion/VariableText";
import { Container } from "@/components/ui/Container";
import { experiencesByYear, sortedExperiences } from "@/content/experiences";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Every role Ananya Shah has held since 2018, in order, with bullets, skills and links. Founder, engineer, analyst and community builder across Boston, Bangalore and Hyderabad.",
  alternates: { canonical: "/experiences" },
};

/** Ananya's words, verbatim. Do not smooth this out. */
const opening =
  "I've always been actively involved and passionate about everything that I do. One thing that I've been accused of is putting my 110% into everything, even things that may not require it. This is why my experience starts all the way from a little bit before high school to now, because you need the full picture if you want to understand the kind of person I am. I'm multifaceted and my passion for my work and the communities that I build runs deep.";

/**
 * Every role, expressed as schema.org data. This is what lets a search engine
 * understand that these are held positions with dates and organizations rather
 * than a list of words on a page.
 */
function timelineJsonLd() {
  const items = sortedExperiences();
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: {
      "@type": "Person",
      name: site.name,
      url: site.url,
      hasOccupation: items.map((item) => ({
        "@type": "Role",
        roleName: item.title,
        startDate: item.start,
        ...(item.end === "present" ? {} : { endDate: item.end }),
        worksFor: { "@type": "Organization", name: item.org },
        ...(item.location ? { url: `${site.url}/experiences#${item.id}` } : {}),
      })),
    },
  };
}

export default function ExperiencesPage() {
  const groups = experiencesByYear();
  const total = sortedExperiences().length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(timelineJsonLd()) }}
      />

      <section className="pt-32 pb-12 sm:pt-40">
        <Container width="wide">
          <p className="text-micro text-ocean-soft">
            {groups[groups.length - 1]?.year} to {groups[0]?.year}
          </p>

          <h1 className="mt-6">
            <VariableText as="span" className="display-face text-display block text-ink">
              Experiences
            </VariableText>
          </h1>

          <Reveal delay={0.1}>
            <p className="text-lede mt-10 max-w-[62ch] text-ink-soft">{opening}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-micro mt-10 text-ink-faint">
              {total} of roughly 25 entries. The rest land once the interaction
              design is signed off.
            </p>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Timeline" className="pb-20">
        <Container width="wide">
          <Timeline groups={groups} />
        </Container>
      </section>
    </>
  );
}
