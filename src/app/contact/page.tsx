import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { VariableText } from "@/components/motion/VariableText";
import { Container } from "@/components/ui/Container";
import { contact, resumes, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}. Email, LinkedIn and GitHub.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "LinkedIn", value: "LinkedIn", href: contact.linkedin, external: true },
  { label: "GitHub", value: "GitHub", href: contact.github, external: true },
];

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

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24 sm:pt-40">
      <Container width="default">
        <p className="text-micro text-ocean-soft">Contact</p>

        <h1 className="mt-6">
          <VariableText as="span" className="display-face text-display block text-ink">
            Say hello
          </VariableText>
        </h1>

        <Reveal delay={0.1}>
          <p className="text-lede mt-8 max-w-[46ch] text-ink-soft">
            Fastest by email. I answer.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="mt-14 border-t border-dune">
            {channels.map((channel) => (
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

        <div id="resume" className="scroll-mt-32 pt-20">
          <h2 className="text-micro text-ocean-soft">Resume</h2>
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
  );
}
