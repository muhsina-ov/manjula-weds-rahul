import { Disc3, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { wedding } from "./data";

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: string | HTMLElement,
        opts: Record<string, unknown>,
      ) => {
        playVideo: () => void;
        pauseVideo: () => void;
        unMute: () => void;
        setVolume: (v: number) => void;
      };
      PlayerState?: { ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

/**
 * Floating looping wedding-song player.
 * Uses the YouTube Shorts track on loop (with playlist-loop),
 * started only after the user taps the seal (autoplay-safe).
 */
export function WeddingMusic({ started }: { started: boolean }) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<{ playVideo: () => void; pauseVideo: () => void } | null>(null);
  const [ready, setReady] = useState(false);
  const holderId = "wedding-song-yt-player";

  useEffect(() => {
    const initPlayer = () => {
      try {
        if (!window.YT?.Player || playerRef.current) return;
        playerRef.current = new window.YT.Player(holderId, {
          videoId: wedding.music.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            loop: 1,
            playlist: wedding.music.youtubeId,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: (e: { target: { setVolume: (v: number) => void; playVideo: () => void } }) => {
              setReady(true);
              try {
                e.target.setVolume(85);
              } catch {
                /* noop */
              }
            },
            onStateChange: (e: { data: number }) => {
              // Safety re-loop if playlist loop is ever blocked
              if (
                e.data === window.YT?.PlayerState?.ENDED &&
                playerRef.current
              ) {
                try {
                  playerRef.current.playVideo();
                } catch {
                  /* noop */
                }
              }
            },
          },
        });
      } catch {
        /* YouTube blocked — button still links to the Short */
      }
    };

    if (document.getElementById("youtube-iframe-api")) {
      if (window.YT?.Player) initPlayer();
      else window.onYouTubeIframeAPIReady = initPlayer;
      return;
    }

    const tag = document.createElement("script");
    tag.id = "youtube-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = initPlayer;
    document.head.appendChild(tag);
  }, []);

  // Auto-start the loop right after the seal is tapped (user gesture)
  useEffect(() => {
    if (!started || playing || !ready || !playerRef.current) return;
    try {
      playerRef.current.unMute?.();
      playerRef.current.playVideo();
      setPlaying(true);
    } catch {
      /* wait for user toggle */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, ready]);

  const toggle = () => {
    if (!playerRef.current) {
      window.open(wedding.music.shortsUrl, "_blank", "noopener,noreferrer");
      return;
    }
    try {
      if (playing) {
        playerRef.current.pauseVideo();
        setPlaying(false);
      } else {
        playerRef.current.unMute?.();
        playerRef.current.playVideo();
        setPlaying(true);
      }
    } catch {
      window.open(wedding.music.shortsUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!started) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed -left-[9999px] bottom-0 h-[2px] w-[2px] overflow-hidden opacity-0"
      >
        <div id={holderId} />
      </div>

      <div className="fixed top-3 right-3 z-40 flex items-center gap-2">
        <a
          href={wedding.music.shortsUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open original wedding song on YouTube"
          className="border-gold/40 bg-emerald-ink/85 text-gold-soft grid h-10 w-10 place-items-center rounded-full border backdrop-blur-sm"
        >
          <Disc3 className="h-4 w-4" />
        </a>
        <button
          onClick={toggle}
          title={playing ? "Pause wedding song" : "Play wedding song on loop"}
          aria-label={playing ? "Pause wedding song" : "Play wedding song on loop"}
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
    </>
  );
}
