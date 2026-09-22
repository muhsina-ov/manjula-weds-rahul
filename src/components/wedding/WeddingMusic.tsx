import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { wedding } from "./data";

/**
 * Floating background-music player (MP3 on loop).
 * Auto-starts right after the user taps the seal (user gesture,
 * so autoplay with sound is allowed). Single toggle button —
 * no YouTube redirect.
 */
export function WeddingMusic({ started }: { started: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Auto-play the BGM once the invitation is opened (seal tap = gesture)
  useEffect(() => {
    if (!started) return;
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.85;
    el
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [started]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.volume = 0.85;
      el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  if (!started) return null;

  return (
    <div className="fixed top-3 right-3 z-40">
      <audio ref={audioRef} src={wedding.music.src} loop preload="auto" playsInline />
      <button
        onClick={toggle}
        title={playing ? "Pause wedding song" : "Play wedding song"}
        aria-label={playing ? "Pause wedding song" : "Play wedding song"}
        className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium tracking-wider backdrop-blur-sm transition-colors ${
          playing
            ? "border-gold bg-emerald-ink/85 text-gold-soft"
            : "border-gold/40 bg-emerald-ink/85 text-ivory/80"
        }`}
      >
        {playing ? (
          <>
            <span className="flex items-end gap-[2px]" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="bg-gold w-[2px] animate-pulse rounded"
                  style={{ height: `${8 + i * 4}px` }}
                />
              ))}
            </span>
            <Volume2 className="h-4 w-4" />
            Song On
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4" />
            Song
          </>
        )}
      </button>
    </div>
  );
}
