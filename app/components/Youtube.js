"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getYoutubeShortsAction } from "../actions/admin";

const FALLBACK_IDS = ["O9FpMgNowYw"];

const generateStars = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 5,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 4,
    color: ["#fff", "#ffe066", "#f9a8d4", "#a5f3fc", "#c4b5fd"][i % 5],
  }));

export default function VideoCarousel() {
  const trackRef   = useRef(null);
  const cardRefs   = useRef([]);
  const playerRefs = useRef([]);

  const [reelIds, setReelIds]         = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  const activeIndexRef = useRef(0);
  const isDragging     = useRef(false);
  const dragStartX     = useRef(0);
  const scrollStart    = useRef(0);
  const scrollTimeout  = useRef(null);

  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(generateStars());
  }, []);

  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  // ── Fetch latest videos from channel ────────────────────
  useEffect(() => {
    getYoutubeShortsAction().then((data) => {
      if (data.ids?.length) {
        setReelIds(data.ids);
        setError(null);
      } else {
        setReelIds(FALLBACK_IDS);
        setError(data.error || "No videos found");
      }
      setLoading(false);
    });
  }, []);

  // ── YouTube IFrame API ───────────────────────────────────
  useEffect(() => {
    if (loading || reelIds.length === 0) return;
    playerRefs.current = [];
    cardRefs.current   = [];

    if (window.YT?.Player) { initPlayers(); return; }
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src   = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => { initPlayers(); };
  }, [loading, reelIds]);

  const initPlayers = useCallback(() => {
    reelIds.forEach((id, i) => {
      if (playerRefs.current[i]) return;
      playerRefs.current[i] = new window.YT.Player(`yt-player-${i}`, {
        videoId: id,
        playerVars: {
          autoplay:       i === 0 ? 1 : 0,
          mute:           1,
          controls:       0,
          modestbranding: 1,
          rel:            0,
          playsinline:    1,
          disablekb:      1,
          fs:             0,
          iv_load_policy: 3,
        },
        events: {
          onStateChange: (e) => {
            if (e.data === 0 && i === activeIndexRef.current) {
              setActiveIndex((prev) =>
                prev < reelIds.length - 1 ? prev + 1 : 0
              );
            }
          },
        },
      });
    });
  }, [reelIds]);

  useEffect(() => {
    scrollToIndex(activeIndex);
    playerRefs.current.forEach((player, i) => {
      if (!player?.pauseVideo) return;
      if (i === activeIndex) {
        player.seekTo(0);
        player.playVideo();
      } else {
        player.pauseVideo();
        player.seekTo(0);
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    const t = setTimeout(() => scrollToIndex(0), 150);
    return () => clearTimeout(t);
  }, [reelIds]);

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    const card  = cardRefs.current[index];
    if (!track || !card) return;
    const offset =
      card.offsetLeft - track.scrollLeft - track.clientWidth / 2 + card.offsetWidth / 2;
    track.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i > 0 ? i - 1 : reelIds.length - 1));
  }, [reelIds.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i < reelIds.length - 1 ? i + 1 : 0));
  }, [reelIds.length]);

  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0, minDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (d < minDist) { minDist = d; closest = i; }
      });
      setActiveIndex(closest);
    }, 150);
  }, []);

  const snapToNearest = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (d < minDist) { minDist = d; closest = i; }
    });
    setActiveIndex(closest);
  }, []);

  const onMouseDown = (e) => {
    isDragging.current  = true;
    dragStartX.current  = e.clientX;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    trackRef.current.scrollLeft =
      scrollStart.current - (e.clientX - dragStartX.current);
  };
  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
    snapToNearest();
  };

  // ── Loading state ────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="w-full py-10 flex flex-col items-center justify-center gap-3"
        style={{
          background: "linear-gradient(to top, #031B33 0%, #ffffff 100%)",
          minHeight: 520,
        }}
      >
        <div style={{ color: "#031B33", fontSize: 14 }}>
          Loading videos from channel…
        </div>
        <div style={{
          width: 32, height: 32,
          border: "3px solid rgba(3,27,51,0.2)",
          borderTop: "3px solid #031B33",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const ACTIVE_W = 220;
  const ACTIVE_H = 400;
  const SIDE_W   = 200;
  const SIDE_H   = 380;

  return (
    <div
      className="w-full py-10 select-none overflow-hidden"
      style={{
        position: "relative",
        background: "linear-gradient(to top, #031B33 0%, #ffffff 100%)",
        minHeight: 520,
      }}
    >
      {/* ── CSS animations ── */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%       { opacity: 0.2; transform: scale(0.5); }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Error banner ── */}
      {error && (
        <div style={{
          position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
          background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)",
          color: "#7f1d1d", fontSize: 12, padding: "4px 12px", borderRadius: 8,
          zIndex: 20, whiteSpace: "nowrap",
        }}>
          ⚠ {error}
        </div>
      )}

      {/* ── Stars ── */}
      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, pointerEvents: "none", zIndex: 1,
          animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
        }}>
          <svg viewBox="0 0 20 20" width={s.size} height={s.size}>
            <polygon
              points="10,0 12,8 20,10 12,12 10,20 8,12 0,10 8,8"
              fill={s.color} opacity="0.5"
            />
          </svg>
        </div>
      ))}

      {/* ── Track ── */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          display: "flex", alignItems: "center", gap: 12,
          overflowX: "auto",
          paddingLeft:  "calc(50vw - 110px)",
          paddingRight: "calc(50vw - 110px)",
          paddingBottom: 16, scrollbarWidth: "none",
          cursor: "grab", position: "relative", zIndex: 5,
        }}
      >
        {reelIds.map((_, i) => {
          const isActive = i === activeIndex;
          const w = isActive ? ACTIVE_W : SIDE_W;
          const h = isActive ? ACTIVE_H : SIDE_H;

          return (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              onClick={() => {
                if (!isDragging.current && !isActive) setActiveIndex(i);
              }}
              style={{
                flexShrink: 0, width: w, height: h,
                borderRadius: 18, overflow: "hidden",
                cursor: isActive ? "default" : "pointer",
                position: "relative", background: "#111",
                zIndex: isActive ? 10 : 1,
                boxShadow: isActive
                  ? "0 0 30px rgba(3,27,51,0.3), 0 0 60px rgba(3,27,51,0.1)"
                  : "none",
                transition:
                  "width 0.35s cubic-bezier(.4,0,.2,1), height 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s",
              }}
            >
              <div
                id={`yt-player-${i}`}
                style={{
                  width: "100%", height: "100%",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              />

              {!isActive && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 18, pointerEvents: "none", zIndex: 20,
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Arrows + Dots ── */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: 16, marginTop: 14,
        position: "relative", zIndex: 5,
      }}>
        {/* Prev button */}
<button
  onClick={goPrev}
  style={{
    width: 36, height: 36, borderRadius: "50%",
    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)",
    border: "2px solid rgba(255,255,255,0.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: 16, color: "#031B33",
    transition: "background 0.2s, color 0.2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#031B33";
    e.currentTarget.style.color = "#ffffff";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.9)";
    e.currentTarget.style.color = "#031B33";
  }}
  aria-label="Previous"
>‹</button>

{/* Dots */}
<div style={{ display: "flex", gap: 6, alignItems: "center", maxWidth: 260, overflowX: "auto", scrollbarWidth: "none" }}>
  {reelIds.map((_, i) => (
    <div
      key={i}
      onClick={() => setActiveIndex(i)}
      style={{
        flexShrink: 0,
        width:  i === activeIndex ? 18 : 7,
        height: 7, borderRadius: 4,
        background: i === activeIndex
          ? "rgba(255,255,255,1)"
          : "rgba(255,255,255,0.5)",
        cursor: "pointer",
        transition: "width 0.3s, background 0.3s",
      }}
    />
  ))}
</div>

{/* Next button */}
<button
  onClick={goNext}
  style={{
    width: 36, height: 36, borderRadius: "50%",
    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)",
    border: "2px solid rgba(255,255,255,0.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: 16, color: "#031B33",
    transition: "background 0.2s, color 0.2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#031B33";
    e.currentTarget.style.color = "#ffffff";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.9)";
    e.currentTarget.style.color = "#031B33";
  }}
  aria-label="Next"
>›</button>
      </div>
    </div>
  );
}