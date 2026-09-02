import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "quiet";
  download?: boolean;
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.9rem] font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

const variants = {
  solid: "bg-ink text-sand hover:bg-coral",
  outline: "border border-ink/25 text-ink hover:border-coral hover:text-coral",
  quiet: "text-ink-soft hover:text-coral",
} as const;

export function Button({
  href,
  children,
  variant = "solid",
  download = false,
  external = false,
  className = "",
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(download ? { download: "" } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
