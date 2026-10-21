import type { Grade } from "@/generated/prisma/enums";
import { GRADE_LABEL } from "@/lib/constants";

const GRADE_VAR: Record<Grade, string> = {
  CLASSIC: "var(--grade-classic)",
  TOP: "var(--grade-top)",
  HIGH: "var(--grade-high)",
  NORMAL: "var(--grade-normal)",
  BAD: "var(--grade-bad)",
};

const GRADE_INK_VAR: Record<Grade, string> = {
  CLASSIC: "var(--grade-classic-ink)",
  TOP: "var(--grade-top-ink)",
  HIGH: "var(--grade-high-ink)",
  NORMAL: "var(--grade-normal-ink)",
  BAD: "var(--grade-bad-ink)",
};

export function GradePill({ grade }: { grade: Grade }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
      style={{ background: GRADE_VAR[grade], color: GRADE_INK_VAR[grade] }}
    >
      {GRADE_LABEL[grade]}
    </span>
  );
}

export { GRADE_VAR };
