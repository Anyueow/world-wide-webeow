import { gameItems } from "@/content/game-items";

/**
 * The escape hatch. A recruiter with thirty seconds should not have to click
 * through the game to get the substance, and this also has to work with no
 * JavaScript at all, since the site is a static export.
 *
 * <details>/<summary> is a real native disclosure widget: it needs zero JS to
 * open, it is keyboard and screen reader accessible for free, and because it
 * is not client state, its content is in the server rendered HTML from the
 * start rather than appearing only after hydration. That is the whole reason
 * this is not a useState-driven component.
 */
export function RevealAll() {
  return (
    <details className="mt-10 max-w-[60ch] border-t border-dune pt-6">
      <summary className="text-micro cursor-pointer text-ocean-soft hover:text-coral">
        Skip the game, show me everything
      </summary>
      <ul className="mt-6 space-y-6">
        {gameItems.map((item) => (
          <li key={item.id}>
            <p className="text-micro text-coral">
              {item.label}
              {item.kind === "decoy" ? ", a lie" : ""}
            </p>
            <p className="text-lede mt-1 text-ink-soft">{item.reveal}</p>
          </li>
        ))}
      </ul>
    </details>
  );
}
