/** Bar geometry of the MIMEN mark, normalised to the widest bar (871 units in the source artwork). */
export const MARK_BARS = [
  { width: 1, offset: 0 },
  { width: 0.8106, offset: 0.1424 },
  { width: 0.6165, offset: 0.0471 },
  { width: 0.4237, offset: 0.1206 },
  { width: 0.2342, offset: 0.3823 },
] as const;

const UNIT = 871;
const BAR_H = 83;
const ROW = 167.5;

interface MarkProps {
  className?: string;
  title?: string;
}

export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox={`0 0 ${UNIT} ${ROW * 4 + BAR_H}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="currentColor"
    >
      {MARK_BARS.map((bar, i) => (
        <rect
          key={i}
          x={bar.offset * UNIT}
          y={i * ROW}
          width={bar.width * UNIT}
          height={BAR_H}
          rx={BAR_H / 2}
        />
      ))}
    </svg>
  );
}
