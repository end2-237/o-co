"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type MusicContextValue = {
  playing: boolean;
  ready: boolean; // audio buffered enough to play without lag
  started: boolean; // the intro has been released by the loader
  title: string;
  prime: () => void; // begin preloading the audio
  begin: () => void; // release the intro (loader is done)
  toggle: () => void;
  start: () => void;
  stop: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}

/**
 * Owns the background-music <audio>. The loader calls `prime()` to preload the
 * track, waits for `ready`, then `begin()`s the experience — so the intro and
 * the music start together with no buffering lag. `start()` plays where the
 * browser allows autoplay, otherwise on the first user gesture.
 */
export function MusicProvider({
  src,
  title,
  children,
}: {
  src: string;
  title: string;
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const primedRef = useRef(false);
  const gestureHandler = useRef<(() => void) | null>(null);

  const removeGesture = useCallback(() => {
    const h = gestureHandler.current;
    if (h) {
      window.removeEventListener("pointerdown", h);
      window.removeEventListener("keydown", h);
      window.removeEventListener("touchstart", h);
      window.removeEventListener("wheel", h);
      gestureHandler.current = null;
    }
  }, []);

  const prime = useCallback(() => {
    if (primedRef.current) return;
    primedRef.current = true;
    const audio = audioRef.current;
    if (!audio) {
      setReady(true);
      return;
    }
    audio.preload = "auto";
    const onReady = () => setReady(true);
    audio.addEventListener("canplaythrough", onReady, { once: true });
    audio.addEventListener("loadeddata", onReady, { once: true });
    audio.load();
    // Safety net so the loader never hangs if the audio is slow or blocked.
    window.setTimeout(() => setReady(true), 6000);
  }, []);

  const begin = useCallback(() => setStarted(true), []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        removeGesture();
      })
      .catch(() => {
        if (gestureHandler.current) return;
        const handler = () => {
          removeGesture();
          audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
        };
        gestureHandler.current = handler;
        window.addEventListener("pointerdown", handler);
        window.addEventListener("keydown", handler);
        window.addEventListener("touchstart", handler);
        window.addEventListener("wheel", handler, { passive: true });
      });
  }, [removeGesture]);

  const stop = useCallback(() => {
    removeGesture();
    audioRef.current?.pause();
    setPlaying(false);
  }, [removeGesture]);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start();
  }, [playing, start, stop]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => removeGesture, [removeGesture]);

  const value = useMemo(
    () => ({ playing, ready, started, title, prime, begin, toggle, start, stop }),
    [playing, ready, started, title, prime, begin, toggle, start, stop],
  );

  return (
    <MusicContext.Provider value={value}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={src} loop preload="none" />
      {children}
    </MusicContext.Provider>
  );
}
