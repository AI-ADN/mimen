import { useCallback, useEffect, useRef, useState, type AnimationEvent } from 'react';
import { brand, contact, journey, media } from '../content';
import { journeyFrame, trackProgress } from '../lib/journey';
import { MARK_BARS } from './Mark';

const COUNT = journey.length;
/** Scroll distance per discipline, in svh. */
const STATE_SVH = 110;
/** Per-frame easing toward the scroll target; smooths coarse wheel steps without lagging touch scroll. */
const SMOOTHING = 0.24;
const NAV_LABELS = [...journey.map((s) => s.sport), contact.navLabel];

interface JourneyProps {
  isMobile: boolean;
  reducedMotion: boolean;
  paused: boolean;
  onTogglePause: () => void;
  onPastChange: (past: boolean) => void;
}

interface CopyState {
  current: number;
  previous: number | null;
  dir: 1 | -1;
}

export function Journey({ isMobile, reducedMotion, paused, onTogglePause, onPastChange }: JourneyProps) {
  const still = reducedMotion || paused;

  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const readyRef = useRef<boolean[]>(Array(COUNT).fill(false));
  const smoothRef = useRef<number[]>(Array(COUNT).fill(0));
  const activeRef = useRef(0);
  const pastRef = useRef(false);
  const stillRef = useRef(still);
  const rafRef = useRef(0);
  const tickRef = useRef<() => void>(() => {});

  const [copy, setCopy] = useState<CopyState>({ current: 0, previous: null, dir: 1 });

  const requestTick = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(() => tickRef.current());
  }, []);

  tickRef.current = () => {
    rafRef.current = 0;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const frame = journeyFrame(trackProgress(rect.top, rect.height, vh), COUNT);

    if (frame.active !== activeRef.current) {
      const next = frame.active;
      const dir = next > activeRef.current ? 1 : -1;
      activeRef.current = next;
      setCopy((c) => ({ current: next, previous: reducedMotion ? null : c.current, dir }));
    }

    const past = rect.bottom < vh - 1;
    if (past !== pastRef.current) {
      pastRef.current = past;
      onPastChange(past);
    }

    const outro = Math.min(1, Math.max(0, (vh - rect.bottom) / (vh * 0.5)));
    stage.querySelectorAll<HTMLElement>('[data-bar-fill]').forEach((el) => {
      const i = Number(el.dataset.index);
      const fill = i === COUNT ? outro : i < frame.active ? 1 : i === frame.active ? frame.local : 0;
      el.style.clipPath = `inset(0 ${((1 - fill) * 100).toFixed(2)}% 0 0 round 9999px)`;
    });

    let settling = false;
    const lastOpaque = frame.clips.reduce((acc, c, j) => (c.opacity >= 1 ? j : acc), 0);

    frame.clips.forEach((clip, j) => {
      const video = videoRefs.current[j];
      if (!video) return;

      if (stillRef.current) {
        video.style.opacity = j <= frame.active ? '1' : '0';
        return;
      }

      video.style.opacity = clip.opacity.toFixed(3);
      const visible = j >= lastOpaque && clip.opacity > 0;
      if (!visible || !readyRef.current[j] || !video.duration) {
        smoothRef.current[j] = clip.time;
        return;
      }

      const prev = smoothRef.current[j];
      const eased = prev + (clip.time - prev) * SMOOTHING;
      const value = Math.abs(clip.time - eased) < 0.0008 ? clip.time : eased;
      smoothRef.current[j] = value;
      if (value !== clip.time) settling = true;

      const t = value * Math.max(0, video.duration - 0.06);
      if (video.seeking) settling = true;
      else if (Math.abs(video.currentTime - t) > 0.012) video.currentTime = t;
    });

    if (settling) requestTick();
  };

  useEffect(() => {
    stillRef.current = still;
    requestTick();
  }, [still, requestTick]);

  useEffect(() => {
    const onScroll = () => requestTick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    requestTick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [requestTick]);

  useEffect(() => {
    if (reducedMotion) return;
    const controller = new AbortController();
    const urls: string[] = [];
    const videos = videoRefs.current;
    readyRef.current = Array(COUNT).fill(false);

    (async () => {
      for (let i = 0; i < COUNT; i++) {
        const src = (isMobile ? journey[i].mobile : journey[i].desktop).video;
        try {
          const res = await fetch(src, { signal: controller.signal });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const url = URL.createObjectURL(await res.blob());
          urls.push(url);
          const video = videos[i];
          if (!video || controller.signal.aborted) continue;
          video.addEventListener(
            'loadeddata',
            () => {
              readyRef.current[i] = true;
              video.dataset.ready = '';
              requestTick();
            },
            { once: true },
          );
          video.src = url;
        } catch (err) {
          if (controller.signal.aborted) return;
          console.warn(`[MIMEN] No se pudo cargar ${src}; se mantiene el póster.`, err);
        }
      }
    })();

    return () => {
      controller.abort();
      videos.forEach((v) => {
        if (!v) return;
        v.removeAttribute('src');
        delete v.dataset.ready;
        v.load();
      });
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [isMobile, reducedMotion, requestTick]);

  const goTo = (i: number) => {
    const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth';
    if (i >= COUNT) {
      document.getElementById('contacto')?.scrollIntoView({ behavior });
      return;
    }
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const distance = track.offsetHeight - window.innerHeight;
    const p = i === 0 ? 0 : (i + 0.3) / COUNT;
    window.scrollTo({ top: top + p * distance, behavior });
  };

  const onCopyExit = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setCopy((c) => ({ ...c, previous: null }));
  };

  const renderCopy = (i: number, role: 'in' | 'out') => {
    const state = journey[i];
    const motion = reducedMotion ? 'fade' : copy.dir > 0 ? 'down' : 'up';
    return (
      <div
        key={`${role}-${i}`}
        className={`copy copy-${role}-${motion}`}
        onAnimationEnd={role === 'out' ? onCopyExit : undefined}
      >
        <p className="sport-label">
          <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
          <span aria-hidden className="mx-2 inline-block h-px w-6 translate-y-[-0.3em] bg-current opacity-50" />
          {state.sport}
        </p>
        <p className="headline mt-3 wide:mt-5">{state.title}</p>
        <p className="support mt-3 wide:mt-4">{state.support}</p>
      </div>
    );
  };

  return (
    <section
      id="recorrido"
      ref={trackRef}
      aria-labelledby="journey-title"
      className="relative"
      style={{ height: `${COUNT * STATE_SVH + 100}svh` }}
    >
      <div ref={stageRef} className={`stage sticky top-0 h-svh overflow-hidden ${still ? 'is-still' : ''}`}>
        <div className="stage-grid h-full">
          <div className="video-area relative overflow-hidden" aria-hidden>
            {journey.map((s, j) => (
              <video
                key={s.id}
                ref={(el) => {
                  videoRefs.current[j] = el;
                }}
                className="clip absolute inset-0 h-full w-full object-cover"
                poster={(isMobile ? s.mobile : s.desktop).poster}
                muted
                playsInline
                disablePictureInPicture
                preload="none"
                tabIndex={-1}
                style={{ opacity: j === 0 ? 1 : 0, zIndex: j }}
              />
            ))}
            <div className="feather" />
            {media.illustrative && <span className="illus-label">{media.illustrativeLabel}</span>}
          </div>

          <div className="info">
            <div className="flex items-center justify-between gap-4">
              <h1 id="journey-title" className="eyebrow">
                {brand.tagline}
              </h1>
              <MiniProgress />
            </div>

            <div className="copy-stack mt-3 wide:mt-auto wide:mb-auto" aria-hidden>
              {copy.previous !== null && copy.previous !== copy.current && renderCopy(copy.previous, 'out')}
              {renderCopy(copy.current, 'in')}
            </div>

            <nav aria-label="Recorrido por disciplinas" className="hidden wide:block">
              <ol className="space-y-0.5">
                {NAV_LABELS.map((label, i) => {
                  const isActive = i === copy.current && i < COUNT;
                  return (
                    <li key={label}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={isActive ? 'step' : undefined}
                        className="nav-row focus-ring"
                      >
                        <span className="relative block h-2.5 w-28 shrink-0">
                          <span
                            className="bar-track absolute inset-y-0 overflow-hidden rounded-full"
                            style={{ left: `${MARK_BARS[i].offset * 100}%`, width: `${MARK_BARS[i].width * 100}%` }}
                          >
                            <span data-bar-fill data-index={i} className="bar-fill" />
                          </span>
                        </span>
                        <span className="nav-label">{label}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="mt-auto flex items-center justify-between gap-4 pt-4 wide:mt-0 wide:pt-0">
              <a href="#contacto" className="text-link focus-ring">
                {contact.otherSport}
              </a>
              {!reducedMotion && (
                <button
                  type="button"
                  onClick={onTogglePause}
                  aria-pressed={paused}
                  className="motion-toggle focus-ring"
                  aria-label={paused ? 'Activar movimiento' : 'Pausar movimiento'}
                >
                  {paused ? <PlayIcon /> : <PauseIcon />}
                  <span className="hidden lg:inline">{paused ? 'Activar movimiento' : 'Pausar movimiento'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        {journey.map((s) => (
          <div key={s.id} id={s.id}>
            <h2>
              {s.sport}: {s.title}
            </h2>
            <p>{s.support}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniProgress() {
  return (
    <span className="relative block h-6 w-9 shrink-0 wide:hidden" aria-hidden>
      {MARK_BARS.map((bar, i) => (
        <span
          key={i}
          className="absolute h-[3px] overflow-hidden rounded-full bg-line"
          style={{ top: `${i * 5.25}px`, left: `${bar.offset * 100}%`, width: `${bar.width * 100}%` }}
        >
          <span data-bar-fill data-index={i} className="bar-fill" />
        </span>
      ))}
    </span>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden fill="currentColor">
      <rect x="3" y="2" width="3.5" height="12" rx="1" />
      <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden fill="currentColor">
      <path d="M4 2.6v10.8a.8.8 0 0 0 1.2.7l8.6-5.4a.8.8 0 0 0 0-1.4L5.2 1.9A.8.8 0 0 0 4 2.6Z" />
    </svg>
  );
}
