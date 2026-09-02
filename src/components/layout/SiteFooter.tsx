import { Container } from "@/components/ui/Container";
import { contact, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-dune bg-sand py-12">
      <Container width="wide">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="display-face max-w-md text-[1.4rem] leading-snug tracking-tight text-ink">
            {site.tagline}
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.875rem] text-ink-soft">
            <li>
              <a
                className="transition-colors hover:text-coral"
                href={`mailto:${contact.email}`}
              >
                Email
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-coral"
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-coral"
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <p className="text-micro mt-10 text-ink-faint">
          {site.name}, {year}
        </p>
      </Container>
    </footer>
  );
}
