import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BOSS, MISSIONS } from "./data";

type ActivityStat = { best: number; attempts: number; completedAt: string; correct: number; total: number };
type GameState = { playerName: string; totalXP: number; earnedBadges: string[]; activityStats: Record<string, ActivityStat>; oracleCleared: boolean };
type Completion = { earned: boolean; passed: boolean; xpAdded: number };
type GameValue = GameState & {
  ready: boolean;
  setPlayerName: (name: string) => void;
  completeMission: (id: string, correct: number, total: number, isBoss?: boolean) => Completion;
  completeOracle: (correct: number, total: number) => Completion;
  isUnlocked: (id: string) => boolean;
  bossUnlocked: boolean;
  resetProgress: () => void;
};

const key = "roots-rifts-progress-v1";
const initial: GameState = { playerName: "", totalXP: 0, earnedBadges: [], activityStats: {}, oracleCleared: false };
const GameContext = createContext<GameValue | null>(null);

function readState(): GameState {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? "null") as Partial<GameState> | null;
    return parsed ? { ...initial, ...parsed, earnedBadges: parsed.earnedBadges ?? [], activityStats: parsed.activityStats ?? {} } : initial;
  } catch { return initial; }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(readState);
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem(key, JSON.stringify(state)); }, [state, ready]);

  const isUnlocked = (id: string) => {
    const mission = MISSIONS.find((item) => item.id === id);
    if (!mission) return false;
    if (mission.order === 1) return true;
    const previous = MISSIONS.find((item) => item.order === mission.order - 1);
    return previous ? state.earnedBadges.includes(previous.badge) : false;
  };
  const bossUnlocked = MISSIONS.every((mission) => state.earnedBadges.includes(mission.badge));

  const value = useMemo<GameValue>(() => ({
    ...state, ready,
    setPlayerName: (name) => setState((previous) => ({ ...previous, playerName: name.trim().slice(0, 30) })),
    completeMission: (id, correct, total, isBoss = false) => {
      const threshold = isBoss ? BOSS.threshold : Math.ceil(total * 0.75);
      const passed = correct >= threshold;
      const mission = MISSIONS.find((item) => item.id === id);
      const badge = isBoss ? BOSS.badge : mission?.badge;
      const score = Math.round((correct / total) * 100);
      const prior = state.activityStats[id]?.best ?? 0;
      const earned = Boolean(passed && badge && !state.earnedBadges.includes(badge));
      const improvement = Math.max(0, score - prior);
      const xpAdded = earned ? (isBoss ? 250 + correct * 10 : 70 + correct * 10) : improvement;
      setState((previous) => ({
        ...previous,
        totalXP: previous.totalXP + xpAdded,
        earnedBadges: earned && badge ? [...previous.earnedBadges, badge] : previous.earnedBadges,
        activityStats: { ...previous.activityStats, [id]: { best: Math.max(prior, score), attempts: (previous.activityStats[id]?.attempts ?? 0) + 1, completedAt: new Date().toISOString(), correct, total } },
      }));
      return { earned, passed, xpAdded };
    },
    completeOracle: (correct) => {
      const passed = correct >= 2;
      const earned = passed && !state.oracleCleared;
      const xpAdded = earned ? 35 : 0;
      setState((previous) => ({ ...previous, oracleCleared: previous.oracleCleared || passed, totalXP: previous.totalXP + xpAdded }));
      return { earned, passed, xpAdded };
    },
    isUnlocked,
    bossUnlocked,
    resetProgress: () => setState(initial),
  }), [state, ready, bossUnlocked]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used inside GameProvider");
  return context;
}
