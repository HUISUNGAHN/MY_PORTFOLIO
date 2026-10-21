import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { STATUS_LABEL, STATUS_ORDER } from "@/lib/constants";
import { RecordCard } from "@/components/RecordCard";
import type { RecordStatus } from "@/generated/prisma/enums";

export default async function RecordsPage() {
  const records = await prisma.record.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const grouped = STATUS_ORDER.map((status) => ({
    status,
    items: records.filter((r) => r.status === status),
  }));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">내 기록</h1>
          <p className="mt-1 text-sm text-ink-2">도서, 동영상, 명언, 음원을 기록하고 관리하세요.</p>
        </div>
        <Link
          href="/records/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast"
        >
          + 새 기록
        </Link>
      </div>

      {grouped.map(({ status, items }) => (
        <Section key={status} status={status} items={items} />
      ))}
    </div>
  );
}

function Section({
  status,
  items,
}: {
  status: RecordStatus;
  items: Awaited<ReturnType<typeof prisma.record.findMany>>;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-lg font-bold">{STATUS_LABEL[status]}</h2>
        <span className="font-tabular font-mono text-xs text-ink-3">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-ink-3">
          아직 기록이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {items.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </section>
  );
}
