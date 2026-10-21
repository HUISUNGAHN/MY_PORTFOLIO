import { prisma } from "@/lib/prisma";
import { GRADE_LABEL, GRADE_ORDER } from "@/lib/constants";
import { StatTile } from "@/components/StatTile";
import { RankedBarChart } from "@/components/RankedBarChart";
import { Sparkline } from "@/components/Sparkline";

export const dynamic = "force-dynamic";

const GRADE_VAR: Record<string, string> = {
  CLASSIC: "var(--grade-classic)",
  TOP: "var(--grade-top)",
  HIGH: "var(--grade-high)",
  NORMAL: "var(--grade-normal)",
  BAD: "var(--grade-bad)",
};

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function StatsPage() {
  const records = await prisma.record.findMany();

  const total = records.length;
  const doneCount = records.filter((r) => r.status === "DONE").length;
  const inProgressCount = records.filter((r) => r.status === "IN_PROGRESS").length;
  const wishlistCount = records.filter((r) => r.status === "WISHLIST").length;
  const incompleteCount = records.filter((r) => r.status === "IN_PROGRESS" && r.progress < 100).length;

  const gradeItems = GRADE_ORDER.map((g) => ({
    label: GRADE_LABEL[g],
    value: records.filter((r) => r.grade === g).length,
    color: GRADE_VAR[g],
  }));

  const ratingBuckets = [
    { label: "0~1", min: 0, max: 1 },
    { label: "1~2", min: 1, max: 2 },
    { label: "2~3", min: 2, max: 3 },
    { label: "3~4", min: 3, max: 4 },
    { label: "4~5", min: 4, max: 5.01 },
  ];
  const ratingItems = ratingBuckets.map((b) => ({
    label: b.label,
    value: records.filter((r) => r.rating >= b.min && r.rating < b.max).length,
    color: "var(--accent)",
  }));

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const activeDenominator = Math.max(1, doneCount + inProgressCount);
  const dayCounts = days.map((d) => {
    const key = dateKey(d);
    const count = records.filter((r) => dateKey(new Date(r.updatedAt)) === key).length;
    return Math.round((count / activeDenominator) * 100);
  });

  let streak = 0;
  for (let i = dayCounts.length - 1; i >= 0; i--) {
    if (dayCounts[i] > 0) streak++;
    else break;
  }

  const todayPct = dayCounts[dayCounts.length - 1];
  const overallPct = total === 0 ? 0 : Math.round(((doneCount + inProgressCount * 0.5) / total) * 100);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">통계</h1>
        <p className="mt-1 text-sm text-ink-2">등급, 별점, 읽은 횟수, 읽는 현황을 한눈에 확인하세요.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile value={`${total}`} label="전체 기록" />
        <StatTile value={`${doneCount}`} label="읽은 것" />
        <StatTile value={`${inProgressCount}`} label="읽고 있는 것" />
        <StatTile value={`${wishlistCount}`} label="읽고 싶은 것" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile value={`${todayPct}%`} label="오늘 진행률" />
        <StatTile value={`${streak}일`} label="연속 기록" />
        <StatTile value={`${overallPct}%`} label="전체 달성률" />
        <StatTile value={`${incompleteCount}`} label="미완 과제" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RankedBarChart title="등급 분포" items={gradeItems} />
        <RankedBarChart title="별점 분포" items={ratingItems} />
      </div>

      <Sparkline
        title="최근 7일 진행 활동"
        current={`${todayPct}%`}
        values={dayCounts}
        labels={days.map((d) => `${d.getMonth() + 1}/${d.getDate()}`)}
      />
    </div>
  );
}
