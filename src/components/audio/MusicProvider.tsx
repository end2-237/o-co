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
  title: string;
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
 * Owns the background-music <audio> element and exposes play/stop/toggle.
 *
 * Browsers block audio autoplay with sound, so `start()` tries to play and, if
 * the browser refuses, arms a one-time listener that starts the track on the
 * user's first interaction (pointer / key / touch) — including the first
 * scroll. The nav toggle can also start/stop it at any time.
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

  // Keep state in sync if the audio is paused/played by other means.
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
    () => ({ playing, title, toggle, start, stop }),
    [playing, title, toggle, start, stop],
  );

  return (
    <MusicContext.Provider value={value}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={src} loop preload="none" />
      {children}
    </MusicContext.Provider>
  );
}
