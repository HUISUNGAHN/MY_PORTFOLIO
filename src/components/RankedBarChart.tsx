type BarItem = { label: string; value: number; color: string };

export function RankedBarChart({ items, title }: { items: BarItem[]; title: string }) {
  const max = Math.max(1, ...items.map((item) => item.value));

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 text-xs font-semibold text-ink-3">{title}</div>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[3.5rem_1fr_2rem] items-center gap-2">
            <span className="text-xs text-ink-2">{item.label}</span>
            <div className="h-2.5 rounded-full bg-surface-2">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(item.value / max) * 100}%`,
                  background: item.color,
                }}
              />
            </div>
            <span className="text-right font-tabular font-mono text-xs text-ink-3">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
