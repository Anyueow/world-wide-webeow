import { FloatingIcon } from "@/components/game/FloatingIcon";
import type { GameItem } from "@/lib/game-types";

/**
 * Scatters a handful of items across whatever section wraps this. The parent
 * section needs `relative` in its className; this fills it edge to edge with
 * `pointer-events-none` so it never blocks clicks on the real content behind
 * it, while each icon opts back into `pointer-events-auto` on itself.
 *
 * Ananya's spec (HANDOFF.md T-G.11) is icons floating across the whole page,
 * not boxed into one section. This is how that reads in code: the same field
 * component is dropped into several sections down the page with a different
 * slice of `gameItems` each time, rather than one big absolutely positioned
 * layer sized to the whole document (which would have to track document
 * height as content changes, a much more fragile thing to keep in sync).
 */
export function GameFloatingField({ items }: { items: readonly GameItem[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item, index) => (
        <FloatingIcon
          key={item.id}
          item={item}
          quadrant={index}
          quadrantCount={items.length}
        />
      ))}
    </div>
  );
}
