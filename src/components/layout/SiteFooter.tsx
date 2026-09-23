import { Container } from "@/components/ui/Container";
import { contact, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dune bg-sand py-8">
      <Container width="wide">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="display-face max-w-md text-[1.4rem] leading-snug tracking-tight text-ink">
            {site.tagline}
          </p>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.875rem] text-ink-soft">
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

        <p className="text-micro mt-6 text-center text-ink-faint">
          {site.name}, {year}
        </p>
      </Container>
    </footer>
  );
}
