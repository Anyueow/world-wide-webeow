"use client";

import { useEffect, useRef } from "react";
import { useGame } from "@/components/game/GameProvider";
import { gameWelcome } from "@/content/game-welcome";

export function GameWelcome() {
  const { welcomeOpen, setGameEnabled } = useGame();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!welcomeOpen || !dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    // Native modal supplies focus trapping and makes the page behind it inert.
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [welcomeOpen]);

  return (
    <dialog ref={dialogRef} aria-labelledby="game-welcome-title"
      aria-describedby="game-welcome-intro game-welcome-choice"
      onCancel={(event) => { event.preventDefault(); setGameEnabled(false); }}
      className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-dune bg-sand p-6 text-ink shadow-xl backdrop:bg-ink/40 sm:p-8">
      <h2 id="game-welcome-title" className="display-face text-2xl">{gameWelcome.title}</h2>
      <p id="game-welcome-intro" className="mt-5 text-base leading-relaxed text-ink-soft">{gameWelcome.introduction}</p>
      <p id="game-welcome-choice" className="mt-4 text-base leading-relaxed text-ink-soft">{gameWelcome.choice}</p>
      <div className="mt-6 flex flex-col gap-3">
        <button type="button" onClick={() => setGameEnabled(true)}
          className="min-h-11 rounded-full bg-ink px-5 py-3 text-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral">{gameWelcome.participate}</button>
        <button type="button" onClick={() => setGameEnabled(false)}
          className="min-h-11 rounded-full border border-dune px-5 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral">{gameWelcome.decline}</button>
      </div>
    </dialog>
  );
}
