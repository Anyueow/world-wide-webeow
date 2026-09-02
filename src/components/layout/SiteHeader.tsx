"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto flex w-full max-w-[104rem] items-center justify-between gap-4 px-6 py-5 sm:px-10 lg:px-14">
        <Link
          href="/"
          className="display-face text-[1.05rem] font-semibold tracking-tight text-ink"
          aria-label={`${site.name}, home`}
        >
          {site.name}
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 sm:gap-7">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group relative text-[0.8rem] font-medium tracking-tight text-ink-soft transition-colors hover:text-ink sm:text-[0.875rem]"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-0 h-px w-full origin-right bg-coral transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
