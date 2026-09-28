import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { assetPath } from "./data";

type Scene = "home" | "practice" | "boss" | "completion";
type AudioValue = { scene: Scene; isPlaying: boolean; muted: boolean; volume: number; setScene: (scene: Scene) => void; toggle: () => void; setMuted: (value: boolean) => void; setVolume: (value: number) => void };
const AudioContext = createContext<AudioValue | null>(null);
const tracks: Record<Scene, string> = { home: assetPath("home_screen.mp3"), practice: assetPath("practice.mp3"), boss: assetPath("Boss_battle.mp3"), completion: assetPath("Completion.mp3") };

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [scene, setSceneState] = useState<Scene>(() => (localStorage.getItem("roots-rifts-audio-scene") as Scene) || "home");
  const [muted, setMutedState] = useState(() => localStorage.getItem("roots-rifts-muted") === "true");
  const [volume, setVolumeState] = useState(() => Number(localStorage.getItem("roots-rifts-volume") ?? "0.34"));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => { audio.current = new Audio(tracks[scene]); audio.current.loop = true; audio.current.volume = muted ? 0 : volume; const node = audio.current; node.onplay = () => setIsPlaying(true); node.onpause = () => setIsPlaying(false); return () => { node.pause(); }; }, [scene]);
  useEffect(() => { localStorage.setItem("roots-rifts-muted", String(muted)); localStorage.setItem("roots-rifts-volume", String(volume)); if (audio.current) audio.current.volume = muted ? 0 : volume; }, [muted, volume]);

  const safelyPlay = useCallback(() => { audio.current?.play().catch(() => setIsPlaying(false)); }, []);
  const setScene = useCallback((next: Scene) => { setSceneState(next); localStorage.setItem("roots-rifts-audio-scene", next); }, []);
  const toggle = useCallback(() => { if (!audio.current) return; if (audio.current.paused) safelyPlay(); else audio.current.pause(); }, [safelyPlay]);
  useEffect(() => { const firstClick = () => { if (!muted) safelyPlay(); document.removeEventListener("pointerdown", firstClick); }; document.addEventListener("pointerdown", firstClick); return () => document.removeEventListener("pointerdown", firstClick); }, [muted, safelyPlay]);
  return <AudioContext.Provider value={{ scene, isPlaying, muted, volume, setScene, toggle, setMuted: setMutedState, setVolume: setVolumeState }}>{children}</AudioContext.Provider>;
}
export function useAudio() { const value = useContext(AudioContext); if (!value) throw new Error("useAudio requires AudioProvider"); return value; }
