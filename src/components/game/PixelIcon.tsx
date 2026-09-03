import { PALETTE } from "@/content/game-items";
import type { PixelGrid } from "@/lib/game-types";

/**
 * Renders a 16x16 pixel grid as inline SVG.
 *
 * One rect per opaque pixel, merged horizontally into runs so a typical icon is
 * 30 to 60 rects rather than 256. `shapeRendering="crispEdges"` is what keeps
 * the pixels hard instead of antialiased into mush at large sizes.
 *
 * No image files, no network request, scales to any size, and it inherits the
 * palette so a token change recolours every icon at once.
 */
export function PixelIcon({
  grid,
  className,
  title,
}: {
  grid: PixelGrid;
  className?: string;
  title?: string;
}) {
  const runs: { x: number; y: number; w: number; fill: string }[] = [];

  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === "0") {
        x += 1;
        continue;
      }
      let w = 1;
      while (x + w < row.length && row[x + w] === ch) w += 1;
      const fill = PALETTE[parseInt(ch, 16)] ?? "transparent";
      runs.push({ x, y, w, fill });
      x += w;
    }
  });

  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      shapeRendering="crispEdges"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {runs.map((r) => (
        <rect
          key={`${r.x}-${r.y}-${r.w}`}
          x={r.x}
          y={r.y}
          width={r.w}
          height={1}
          fill={r.fill}
        />
      ))}
    </svg>
  );
}
