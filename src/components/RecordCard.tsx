import type { RecordModel } from "@/generated/prisma/models";
import { TYPE_LABEL } from "@/lib/constants";
import { GradePill } from "@/components/GradePill";
import { StarRating } from "@/components/StarRating";
import { ProgressBar } from "@/components/ProgressBar";
import { DeleteRecordButton } from "@/components/DeleteRecordButton";

const TYPE_EMOJI: Record<string, string> = {
  BOOK: "📘",
  VIDEO: "🎬",
  QUOTE: "💬",
  AUDIO: "🎧",
};

export function RecordCard({ record }: { record: RecordModel }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex gap-3">
        <div
          className="flex h-16 w-12 flex-shrink-0 items-center justify-center rounded-md text-xl"
          style={{ background: "linear-gradient(155deg, var(--accent), var(--accent-soft))" }}
        >
          {TYPE_EMOJI[record.type] ?? "📘"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate font-bold leading-tight">{record.title}</div>
              <div className="truncate text-xs text-ink-3">
                {record.author}
                {record.publisher ? ` · ${record.publisher}` : ""}
              </div>
            </div>
            <DeleteRecordButton id={record.id} />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <GradePill grade={record.grade} />
            <StarRating rating={record.rating} />
            <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-ink-3">
              {TYPE_LABEL[record.type]}
            </span>
            {record.ageGroup && (
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-ink-3">
                {record.ageGroup} 선호
              </span>
            )}
            {record.isPremium && (
              <span className="rounded-full border border-accent px-2 py-0.5 text-[11px] font-semibold text-accent">
                PRO
              </span>
            )}
          </div>

          <div className="mt-3">
            <ProgressBar value={record.progress} label="진행률" />
          </div>
        </div>
      </div>
    </div>
  );
}
