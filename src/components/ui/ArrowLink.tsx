import Link from "next/link";
import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  tone?: "ink" | "coral" | "sand";
};

/**
 * The one link style for calls to action. The arrow slides on hover, the rule
 * underneath wipes in from the left. Both are transforms, both are CSS.
 */
export function ArrowLink({
  href,
  children,
  external = false,
  className = "",
  tone = "ink",
}: ArrowLinkProps) {
  const color =
    tone === "coral"
      ? "text-coral"
      : tone === "sand"
        ? "text-sand"
        : "text-ink";
  const rule =
    tone === "coral"
      ? "bg-coral"
      : tone === "sand"
        ? "bg-sand"
        : "bg-ink";

  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className={`absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 ${rule}`}
        />
      </span>
      <span
        aria-hidden="true"
        className="inline-block translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      >
        &#8594;
      </span>
    </>
  );

  const classes = `group inline-flex items-baseline gap-2 text-[0.95rem] font-medium ${color} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
