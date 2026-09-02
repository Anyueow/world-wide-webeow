import Image from "next/image";
import type { PhotoSlot } from "@/lib/types";

type PhotoFrameProps = {
  photo: PhotoSlot;
  className?: string;
  /** Passed to next/image. Matters for a real photo, ignored for a placeholder. */
  sizes?: string;
  priority?: boolean;
  /** Short label shown on the empty state, for example "2020, Bindu". */
  slotLabel?: string;
  /** Collapse the empty state to one line instead of reserving the full box. */
  compact?: boolean;
};

/**
 * Renders a photo, or an honest empty slot if there is no file yet.
 *
 * The empty state occupies exactly the space the real photo will, so filling a
 * slot never reflows the page. The note from the content file is printed in the
 * placeholder so it is obvious what belongs there while building.
 */
export function PhotoFrame({
  photo,
  className = "",
  sizes = "(max-width: 768px) 100vw, 40vw",
  priority = false,
  slotLabel,
  compact = false,
}: PhotoFrameProps) {
  if (photo.src) {
    return (
      <figure className={`relative overflow-hidden bg-dune ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {photo.caption ? (
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3 text-xs text-sand">
            {photo.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  // Empty slots used to reserve the full photo footprint, which turned a 27
  // entry timeline into an enormous page of grey rectangles. They now collapse
  // to a single labelled line and only take the real footprint once a file
  // exists. Adding a src is still the only thing needed to fill one.
  if (compact) {
    return (
      <div
        className="flex items-baseline gap-2 border-l border-dashed border-ocean-soft/50 py-1 pl-3"
        role="img"
        aria-label={`Photo slot, not yet filled: ${photo.alt}`}
      >
        <span className="text-micro shrink-0 text-ocean-soft">Photo slot</span>
        <span className="truncate text-xs text-ink-faint">
          {slotLabel ?? photo.alt}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-dashed border-ocean-soft/60 bg-shell ${className}`}
      role="img"
      aria-label={`Photo slot, not yet filled: ${photo.alt}`}
    >
      <div className="px-4 py-6 text-center">
        <span className="text-micro block text-ocean-soft">
          {slotLabel ?? "Photo slot"}
        </span>
        <span className="mt-2 block text-xs leading-snug text-ink-faint">
          {photo.note ?? photo.alt}
        </span>
      </div>
    </div>
  );
}
