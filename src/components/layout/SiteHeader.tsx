"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";

/**
 * Fixed header over a page that is sand in some places and deep ocean in
 * others.
 *
 * Rather than tracking which section is underneath, the whole bar is set in
 * sand and composited with mix-blend-difference. Over the sand background the
 * difference is near zero, so the type reads as near black. Over the ocean
 * panel it inverts to near white. One line of CSS, no scroll listener, and it
 * cannot fall out of sync with the tide animation.
 *
 * Everything inside inherits currentColor for the same reason.
 */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-30 text-sand mix-blend-difference">
      <div className="mx-auto flex w-full max-w-[104rem] items-center justify-between gap-4 px-6 py-5 sm:px-10 lg:px-14">
        <Link
          href="/"
          className="display-face text-[1.05rem] font-semibold tracking-tight whitespace-nowrap"
          aria-label={`${site.name}, home`}
        >
          <span className="sm:hidden" aria-hidden="true">
            AS
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-3.5 sm:gap-7">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative text-[0.75rem] font-medium tracking-tight whitespace-nowrap transition-opacity sm:text-[0.875rem] ${
                      active ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-0 h-px w-full origin-right bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 ${
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
