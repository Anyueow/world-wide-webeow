"use client";

import Image from "next/image";
import { VariableText } from "@/components/motion/VariableText";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

/** A centered introduction with natural wrapping and one compact portrait. */
export function Hero() {
  return (
    <section className="pt-24 pb-6 text-center sm:pt-28 sm:pb-8">
      <Container width="prose">
        <h1>
          <VariableText
            as="span"
            className="display-face block text-[clamp(2.75rem,8vw,6rem)] leading-[1.05] tracking-tight text-ink"
            delay={0.1}
          >
            Ananya Shah
          </VariableText>
        </h1>
        <p className="text-lede mx-auto mt-4 max-w-[42ch] text-ink-soft">
          {site.description}
        </p>
        <div className="relative mx-auto mt-5 aspect-855/941 w-32 sm:w-40">
          <Image
            src="/images/ananya-caricature.png"
            alt="Illustrated portrait of Ananya Shah at a laptop, giving a thumbs up"
            fill
            priority
            sizes="(max-width: 640px) 128px, 160px"
            className="object-contain"
          />
        </div>
      </Container>
    </section>
  );
}
