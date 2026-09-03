"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { gameItems, trueItemCount } from "@/content/game-items";
import { loadProgress, saveProgress } from "@/lib/game-storage";

export type FlightRequest = {
  itemId: string;
  fromRect: DOMRect;
};

type GameContextValue = {
  collectedIds: Set<string>;
  attemptedIds: Set<string>;
  trueItemCount: number;
  basketOpen: boolean;
  collect: (itemId: string, kind: "true" | "decoy", fromRect: DOMRect) => void;
  toggleBasket: () => void;
  closeBasket: () => void;
  basketRef: RefObject<HTMLButtonElement | null>;
  flight: FlightRequest | null;
  clearFlight: () => void;
  lastOpenedId: string | null;
};

const GameContext = createContext<GameContextValue | null>(null);

/**
 * One shared game state for the whole page. The icons are scattered across
 * several sections (T-G.3 revision: floating over the document rather than
 * boxed into one section), but there is only one basket and one scorecard,
 * so the state that used to live inside a single GameBoard now lives here
 * and every FloatingIcon, the basket and the scorecard all read from it.
 */
export function GameProvider({ children }: { children: ReactNode }) {
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set());
  const [attemptedIds, setAttemptedIds] = useState<Set<string>>(new Set());
  const [basketOpen, setBasketOpen] = useState(false);
  const [flight, setFlight] = useState<FlightRequest | null>(null);
  const [lastOpenedId, setLastOpenedId] = useState<string | null>(null);
  const basketRef = useRef<HTMLButtonElement | null>(null);
  const hasLoaded = useRef(false);

  // Loaded after mount, client only. Initial render always matches the
  // server (empty), so there is nothing to hydration-mismatch.
  useEffect(() => {
    const stored = loadProgress();
    if (stored.collected.length || stored.attempted.length) {
      setCollectedIds(new Set(stored.collected));
      setAttemptedIds(new Set(stored.attempted));
    }
    hasLoaded.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    saveProgress({
      collected: Array.from(collectedIds),
      attempted: Array.from(attemptedIds),
    });
  }, [collectedIds, attemptedIds]);

  const collect = useCallback(
    (itemId: string, kind: "true" | "decoy", fromRect: DOMRect) => {
      setLastOpenedId(itemId);
      setAttemptedIds((prev) => {
        if (prev.has(itemId)) return prev;
        const next = new Set(prev);
        next.add(itemId);
        return next;
      });

      if (kind !== "true") return;

      setCollectedIds((prev) => {
        if (prev.has(itemId)) return prev;
        const next = new Set(prev);
        next.add(itemId);
        return next;
      });

      setFlight({ itemId, fromRect });
    },
    [],
  );

  const clearFlight = useCallback(() => setFlight(null), []);
  const toggleBasket = useCallback(() => setBasketOpen((v) => !v), []);
  const closeBasket = useCallback(() => setBasketOpen(false), []);

  return (
    <GameContext.Provider
      value={{
        collectedIds,
        attemptedIds,
        trueItemCount,
        basketOpen,
        collect,
        toggleBasket,
        closeBasket,
        basketRef,
        flight,
        clearFlight,
        lastOpenedId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return ctx;
}

export function itemById(id: string) {
  return gameItems.find((item) => item.id === id) ?? null;
}
