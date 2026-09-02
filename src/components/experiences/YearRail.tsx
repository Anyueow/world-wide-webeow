"use client";

import { useEffect, useState } from "react";

/**
 * The sticky year rail.
 *
 * With twenty five entries spanning nine years, the single most useful thing
 * the page can offer is the ability to jump. This is that, and it doubles as
 * the reader's position indicator.
 *
 * It is a nav of real anchor links, so it works with JavaScript off, it is
 * keyboard operable for free, and each year is a crawlable internal link.
 */
export function YearRail({ years }: { years: number[] }) {
  const [current, setCurrent] = useState<number | null>(years[0] ?? null);

  useEffect(() => {
    const headings = years
      .map((year) => document.getElementById(`year-${year}`))
      .filter((node): node is HTMLElement => Boolean(node));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) {
          setCurrent(Number(visible.target.id.replace("year-", "")));
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [years]);

  return (
    <nav aria-label="Jump to year" className="sticky top-28 hidden lg:block">
      <p className="text-micro mb-4 text-ink-faint">Years</p>
      <ul className="space-y-1.5">
        {years.map((year) => {
          const active = year === current;
          return (
            <li key={year}>
              <a
                href={`#year-${year}`}
                aria-current={active ? "true" : undefined}
                className={`group flex items-center gap-2 text-[0.95rem] tabular-nums transition-colors duration-300 ${
                  active ? "text-coral" : "text-ink-faint hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active ? "w-6" : "w-2 group-hover:w-4"
                  }`}
                />
                {year}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
