import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="pt-40 pb-32">
      <Container width="default">
        <p className="text-micro text-ocean-soft">404</p>
        <h1 className="display-face text-display mt-6 text-ink">
          Nothing here
        </h1>
        <p className="text-lede mt-6 max-w-[42ch] text-ink-soft">
          That page does not exist. The work is this way.
        </p>
        <p className="mt-8">
          <Link
            href="/"
            className="text-[0.95rem] font-medium text-coral underline underline-offset-4"
          >
            Back to the start
          </Link>
        </p>
      </Container>
    </section>
  );
}
