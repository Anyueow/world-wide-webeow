import fs from "node:fs";
import path from "node:path";
import { Hero } from "@/components/home/Hero";
import { GameBoard } from "@/components/game/GameBoard";
import { RevealAll } from "@/components/game/RevealAll";
import { Reveal } from "@/components/motion/Reveal";
import { VariableText } from "@/components/motion/VariableText";
import { Timeline } from "@/components/experiences/Timeline";
import { CameraRollGrid } from "@/components/whoami/CameraRollGrid";
import { PacificaTide } from "@/components/whoami/PacificaTide";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { bio, contact, resumes, site } from "@/content/site";
import { experiencesByYear, sortedExperiences } from "@/content/experiences";
import { impactItems } from "@/content/impact";

/** DRAFT COPY. Rewrite freely. */
const whoAmIIntro = [
  "You learn more about me from my camera roll than from my resume.",
  "There is over a terabyte of it, going back years, almost none of it sorted. Runs, sets, airports, dinners I hosted, dogs I met once. It is the honest version.",
  "Here is a slice.",
];

/** DRAFT. Enumerated, so bullets are the right call here. */
const intoIt = [
  "Running, most mornings",
  "DJing, badly at first",
  "Thirteen countries so far",
  "Hosting people, feeding people",
  "LLMs, interpretability, agentic systems",
  "Animal rights and the climate, seriously",
];

/** Ananya's words, verbatim. Do not smooth this out. */
const experiencesOpening =
  "I've always been actively involved and passionate about everything that I do. One thing that I've been accused of is putting my 110% into everything, even things that may not require it. This is why my experience starts all the way from a little bit before high school to now, because you need the full picture if you want to understand the kind of person I am. I'm multifaceted and my passion for my work and the communities that I build runs deep.";

/**
 * Checked at build time, not in the browser. A resume only gets a download
 * link once the PDF actually exists in /public/resume, so the page can never
 * offer a file that 404s. Drop the PDFs in and rebuild, and they light up.
 */
function resumeExists(file: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", file.replace(/^\//, "")));
  } catch {
    return false;
  }
}

/**
 * One Person node carrying every occupation, since the site is now one page
 * rather than a `/` plus a `/experiences`. Google gets the full picture from
 * a single script tag instead of two that used to reference each other.
 */
function personJsonLd() {
  const items = sortedExperiences();
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
    hasOccupation: items.map((item) => ({
      "@type": "Role",
      roleName: item.title,
      startDate: item.start,
      ...(item.end === "present" ? {} : { endDate: item.end }),
      worksFor: { "@type": "Organization", name: item.org },
    })),
  };
}

export default function HomePage() {
  const groups = experiencesByYear();
  const experienceCount = sortedExperiences().length;

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
                  <Button href="#experiences">View my work</Button>
                  <Button href="#resume" variant="outline">
                    Download resume
                  </Button>
                  <Button href="#contact" variant="quiet">
                    Get in touch
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="game"
        aria-labelledby="game-heading"
        className="scroll-mt-24 border-t border-dune py-24"
      >
        <Container width="wide">
          <p className="text-micro text-ocean-soft">Two truths and a lie</p>
          <h2 id="game-heading" className="mt-6 max-w-[16ch]">
            <VariableText as="span" className="display-face text-display block text-ink">
              Click what is her
            </VariableText>
          </h2>
          <p className="text-lede mt-6 max-w-[52ch] text-ink-soft">
            A few of these are real. A few are not. Collect the real ones.
          </p>

          <div className="mt-12">
            <GameBoard />
          </div>

          <RevealAll />
        </Container>
      </section>

      <section
        id="who-am-i"
        aria-labelledby="who-am-i-heading"
        className="scroll-mt-24 border-t border-dune pt-24 pb-16"
      >
        <Container width="wide">
          <p className="text-micro text-ocean-soft">Who am I</p>
          <h2 id="who-am-i-heading" className="mt-6 max-w-[13ch]">
            <VariableText as="span" className="display-face text-display block text-ink">
              The camera roll
            </VariableText>
          </h2>

          <div className="mt-10 max-w-[54ch]">
            {whoAmIIntro.map((line, index) => (
              <Reveal key={line} delay={index * 0.08}>
                <p className="text-lede mb-4 text-ink-soft">{line}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="roll-heading" className="pb-24">
        <Container width="wide">
          <h3 id="roll-heading" className="sr-only">
            Photographs
          </h3>
          <CameraRollGrid />
        </Container>
      </section>

      <PacificaTide />

      <section aria-labelledby="into-heading" className="border-t border-dune py-24">
        <Container width="wide">
          <h3 id="into-heading" className="text-micro text-ocean-soft">
            What I am into
          </h3>
          <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {intoIt.map((item, index) => (
              <Reveal as="li" key={item} delay={index * 0.05}>
                <span className="display-face block border-b border-dune pb-3 text-[clamp(1.1rem,2vw,1.5rem)] tracking-tight text-ink">
                  {item}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <p className="text-lede mt-14 max-w-[46ch] text-ink-soft">
              The work version of all this is on the timeline.
            </p>
            <div className="mt-4">
              <ArrowLink href="#experiences" tone="coral">
                Go to experiences
              </ArrowLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section
        id="experiences"
        aria-labelledby="experiences-heading"
        className="scroll-mt-24 border-t border-dune pt-24 pb-12"
      >
        <Container width="wide">
          <p className="text-micro text-ocean-soft">
            {groups[groups.length - 1]?.year} to {groups[0]?.year}
          </p>

          <h2 id="experiences-heading" className="mt-6">
            <VariableText as="span" className="display-face text-display block text-ink">
              Experiences
            </VariableText>
          </h2>

          <Reveal delay={0.1}>
            <p className="text-lede mt-10 max-w-[62ch] text-ink-soft">
              {experiencesOpening}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-micro mt-10 text-ink-faint">
              {experienceCount} of roughly 25 entries. The rest land once the
              interaction design is signed off.
            </p>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Timeline" className="pb-20">
        <Container width="wide">
          <Timeline groups={groups} />
        </Container>
      </section>

      <section
        id="impact"
        aria-labelledby="impact-heading"
        className="scroll-mt-24 border-t border-dune pt-24 pb-24"
      >
        <Container width="wide">
          <p className="text-micro text-ocean-soft">Impact</p>

          <h2 id="impact-heading" className="mt-6">
            <VariableText as="span" className="display-face text-display block text-ink">
              The proof
            </VariableText>
          </h2>

          {impactItems.length === 0 ? (
            <Reveal delay={0.1}>
              <p className="text-lede mt-10 max-w-[48ch] text-ink-soft">
                This section is next. Papers, repos, prototypes and talks, each
                one a card with a link straight to the artifact.
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
                    <h3 className="display-face mt-2 text-[1.3rem] leading-tight tracking-tight text-ink">
                      {item.title}
                    </h3>
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

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-24 border-t border-dune pt-24 pb-24"
      >
        <Container width="default">
          <p className="text-micro text-ocean-soft">Contact</p>

          <h2 id="contact-heading" className="mt-6">
            <VariableText as="span" className="display-face text-display block text-ink">
              Say hello
            </VariableText>
          </h2>

          <Reveal delay={0.1}>
            <p className="text-lede mt-8 max-w-[46ch] text-ink-soft">
              Fastest by email. I answer.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <ul className="mt-14 border-t border-dune">
              {[
                { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
                { label: "LinkedIn", value: "LinkedIn", href: contact.linkedin, external: true },
                { label: "GitHub", value: "GitHub", href: contact.github, external: true },
              ].map((channel) => (
                <li key={channel.label} className="border-b border-dune">
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-baseline justify-between gap-6 py-6"
                  >
                    <span className="text-micro text-ink-faint">{channel.label}</span>
                    <span className="display-face text-title text-ink transition-colors group-hover:text-coral">
                      {channel.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <div id="resume" className="scroll-mt-24 pt-20">
            <h3 className="text-micro text-ocean-soft">Resume</h3>
            <Reveal delay={0.06}>
              <ul className="mt-6 space-y-1">
                {resumes.map((resume) => {
                  const available = resumeExists(resume.file);
                  return (
                    <li key={resume.id} className="border-b border-dune py-5">
                      {available ? (
                        <a
                          href={resume.file}
                          download
                          className="group flex flex-wrap items-baseline justify-between gap-2"
                        >
                          <span className="display-face text-[1.35rem] tracking-tight text-ink transition-colors group-hover:text-coral">
                            {resume.label}
                          </span>
                          <span className="text-[0.85rem] text-ink-soft">
                            {resume.description}
                          </span>
                        </a>
                      ) : (
                        <div className="flex flex-wrap items-baseline justify-between gap-2 opacity-55">
                          <span className="display-face text-[1.35rem] tracking-tight text-ink">
                            {resume.label}
                          </span>
                          <span className="text-micro text-ink-faint">
                            PDF not added yet
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
