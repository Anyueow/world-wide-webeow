import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { VariableText } from "@/components/motion/VariableText";
import { CameraRollGrid } from "@/components/whoami/CameraRollGrid";
import { PacificaTide } from "@/components/whoami/PacificaTide";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Who am I",
  description:
    "A person is best understood by their camera roll. Running, DJing, thirteen countries, a full dinner table, and a personality that turns out to be Pacifica.",
  alternates: { canonical: "/who-am-i" },
};

/** DRAFT COPY. Rewrite freely. */
const intro = [
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

export default function WhoAmIPage() {
  return (
    <>
      <section className="pt-32 pb-16 sm:pt-40">
        <Container width="wide">
          <p className="text-micro text-ocean-soft">Who am I</p>
          <h1 className="mt-6 max-w-[13ch]">
            <VariableText as="span" className="display-face text-display block text-ink">
              The camera roll
            </VariableText>
          </h1>

          <div className="mt-10 max-w-[54ch]">
            {intro.map((line, index) => (
              <Reveal key={line} delay={index * 0.08}>
                <p className="text-lede mb-4 text-ink-soft">{line}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="roll-heading" className="pb-24">
        <Container width="wide">
          <h2 id="roll-heading" className="sr-only">
            Photographs
          </h2>
          <CameraRollGrid />
        </Container>
      </section>

      <PacificaTide />

      <section aria-labelledby="into-heading" className="border-t border-dune py-24">
        <Container width="wide">
          <h2 id="into-heading" className="text-micro text-ocean-soft">
            What I am into
          </h2>
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
              <ArrowLink href="/experiences" tone="coral">
                Go to experiences
              </ArrowLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
