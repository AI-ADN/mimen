import { describe, expect, it } from 'vitest';
import { journeyFrame, trackProgress } from './journey';

describe('journeyFrame', () => {
  it('starts on the first state with only the first clip visible', () => {
    const f = journeyFrame(0, 4);
    expect(f.active).toBe(0);
    expect(f.clips.map((c) => c.opacity)).toEqual([1, 0, 0, 0]);
    expect(f.clips[0].time).toBe(0);
  });

  it('switches copy exactly at a boundary, mid-crossfade', () => {
    const before = journeyFrame(0.2499, 4);
    const after = journeyFrame(0.2501, 4);
    expect(before.active).toBe(0);
    expect(after.active).toBe(1);
    expect(before.clips[1].opacity).toBeGreaterThan(0.45);
    expect(before.clips[1].opacity).toBeLessThan(0.55);
  });

  it('is symmetric when scrolling back: same progress, same frame', () => {
    expect(journeyFrame(0.61, 4)).toEqual(journeyFrame(0.61, 4));
  });

  it('fully covers previous clips outside the crossfade', () => {
    const f = journeyFrame(0.5 + 0.1, 4);
    expect(f.active).toBe(2);
    expect(f.clips[2].opacity).toBe(1);
    expect(f.clips[3].opacity).toBe(0);
  });

  it('advances each clip monotonically through its window', () => {
    const times = [0.3, 0.35, 0.4, 0.45].map((p) => journeyFrame(p, 4).clips[1].time);
    times.reduce((prev, t) => {
      expect(t).toBeGreaterThan(prev);
      return t;
    }, -1);
  });

  it('ends on the last state with its clip at the final frame', () => {
    const f = journeyFrame(1, 4);
    expect(f.active).toBe(3);
    expect(f.local).toBe(1);
    expect(f.clips[3]).toEqual({ opacity: 1, time: 1 });
  });

  it('clamps out-of-range progress', () => {
    expect(journeyFrame(-0.5, 4)).toEqual(journeyFrame(0, 4));
    expect(journeyFrame(1.5, 4)).toEqual(journeyFrame(1, 4));
  });
});

describe('trackProgress', () => {
  it('maps the pinned scroll distance to 0..1', () => {
    expect(trackProgress(0, 3000, 1000)).toBe(0);
    expect(trackProgress(-1000, 3000, 1000)).toBe(0.5);
    expect(trackProgress(-2000, 3000, 1000)).toBe(1);
    expect(trackProgress(-2500, 3000, 1000)).toBe(1);
    expect(trackProgress(200, 3000, 1000)).toBe(0);
  });
});
