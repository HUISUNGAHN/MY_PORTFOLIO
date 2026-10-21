export function Sparkline({
  values,
  labels,
  title,
  current,
}: {
  values: number[];
  labels: string[];
  title: string;
  current: string;
}) {
  const width = 280;
  const height = 64;
  const padding = 6;
  const max = Math.max(100, ...values);
  const min = 0;
  const step = values.length > 1 ? (width - padding * 2) / (values.length - 1) : 0;

  const points = values.map((v, i) => {
    const x = padding + i * step;
    const y = height - padding - ((v - min) / (max - min)) * (height - padding * 2);
    return { x, y };
  });

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = `${padding},${height - padding} ${linePoints} ${width - padding},${height - padding}`;
  const last = points[points.length - 1];

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink-3">
        <span>{title}</span>
        <span className="font-tabular font-mono text-ink-2">{current}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <polygon points={areaPoints} fill="var(--accent)" opacity="0.14" />
        <polyline
          points={linePoints}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {last && <circle cx={last.x} cy={last.y} r="4" fill="var(--accent)" />}
      </svg>
      <div className="mt-1 flex justify-between font-tabular font-mono text-[10px] text-ink-3">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
