export interface ClipFrame {
  /** 0..1 layer opacity; clips are stacked so a later clip covers earlier ones. */
  opacity: number;
  /** 0..1 position within the clip's duration. */
  time: number;
}

export interface JourneyFrame {
  /** Index of the state whose copy is shown; switches at the middle of each crossfade. */
  active: number;
  /** 0..1 progress within the active state. */
  local: number;
  clips: ClipFrame[];
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

/**
 * Maps scroll progress through the journey (0..1) to the visible clip stack.
 * `blend` is the crossfade width, in state units, centred on each boundary.
 */
export function journeyFrame(progress: number, count: number, blend = 0.18): JourneyFrame {
  const seg = clamp01(progress) * count;
  const half = blend / 2;
  const active = Math.min(count - 1, Math.floor(seg));

  const clips = Array.from({ length: count }, (_, j): ClipFrame => {
    const start = j === 0 ? 0 : j - half;
    const end = j === count - 1 ? count : j + 1 + half;
    return {
      opacity: j === 0 ? 1 : smoothstep(j - half, j + half, seg),
      time: clamp01((seg - start) / (end - start)),
    };
  });

  return { active, local: clamp01(seg - active), clips };
}

/** Scroll progress through a pinned track: 0 when its top meets the viewport top, 1 when its bottom meets the viewport bottom. */
export function trackProgress(top: number, height: number, viewport: number): number {
  const distance = height - viewport;
  if (distance <= 0) return top <= 0 ? 1 : 0;
  return clamp01(-top / distance);
}
