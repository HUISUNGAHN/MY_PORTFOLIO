import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { GradePill } from "@/components/GradePill";
import { StarRating } from "@/components/StarRating";
import { setSubscription } from "@/app/curation/actions";

export default async function CurationPage() {
  const store = await cookies();
  const subscribed = store.get("pro_subscribed")?.value === "1";

  const records = await prisma.record.findMany({
    where: { isPremium: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">큐레이션 PRO</h1>
        <p className="mt-1 text-sm text-ink-2">
          선정한 책의 요약, 교훈 7가지, 토론거리 7가지를 제공하는 유료 큐레이션입니다.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
        <div className="text-sm">
          <span className="font-semibold">구독 상태: </span>
          <span className={subscribed ? "text-accent" : "text-ink-3"}>
            {subscribed ? "구독 중" : "미구독"}
          </span>
          <span className="ml-2 text-xs text-ink-3">
            (결제 연동 전 데모용 토글입니다 — 추후 Stripe로 교체 예정)
          </span>
        </div>
        <form action={setSubscription}>
          <input type="hidden" name="value" value={subscribed ? "false" : "true"} />
          <button
            type="submit"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast"
          >
            {subscribed ? "구독 해지(데모)" : "구독하기(데모)"}
          </button>
        </form>
      </div>

      {records.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-ink-3">
          PRO로 표시된 기록이 없습니다. 기록을 추가할 때 "PRO 큐레이션 대상" 체크를 켜주세요.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {records.map((record) => {
            const lessons: string[] = record.proLessons ? JSON.parse(record.proLessons) : [];
            const discussion: string[] = record.proDiscussion ? JSON.parse(record.proDiscussion) : [];

            return (
              <div key={record.id} className="rounded-xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold">{record.title}</span>
                  <GradePill grade={record.grade} />
                  <StarRating rating={record.rating} />
                </div>
                <div className="mt-1 text-xs text-ink-3">{record.author}</div>

                {subscribed ? (
                  <div className="mt-4 flex flex-col gap-4">
                    <div>
                      <div className="mb-1 text-xs font-semibold text-ink-3">요약</div>
                      <p className="text-sm text-ink-2">{record.proSummary ?? record.summary}</p>
                    </div>
                    {lessons.length > 0 && (
                      <div>
                        <div className="mb-1 text-xs font-semibold text-ink-3">교훈 7가지</div>
                        <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-2">
                          {lessons.map((l, i) => (
                            <li key={i}>{l}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {discussion.length > 0 && (
                      <div>
                        <div className="mb-1 text-xs font-semibold text-ink-3">토론거리 7가지</div>
                        <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-2">
                          {discussion.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative mt-4 overflow-hidden rounded-lg border border-dashed border-border p-4">
                    <p className="select-none text-sm text-ink-3 blur-[3px]">
                      {(record.proSummary ?? record.summary).slice(0, 80)}...
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center bg-surface/60">
                      <span className="rounded-full border border-accent px-3 py-1 text-xs font-semibold text-accent">
                        🔒 구독하고 전체 보기
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
