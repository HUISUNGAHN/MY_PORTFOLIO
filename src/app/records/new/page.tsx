import { createRecord } from "@/app/records/actions";
import { AGE_GROUPS, GRADE_LABEL, GRADE_ORDER, STATUS_LABEL, STATUS_ORDER, TYPE_LABEL, TYPE_ORDER } from "@/lib/constants";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft";
const labelClass = "mb-1.5 block text-xs font-semibold text-ink-2";

export default function NewRecordPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">새 기록 추가</h1>

      <form action={createRecord} className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>종류</label>
            <select name="type" defaultValue="BOOK" className={inputClass}>
              {TYPE_ORDER.map((t) => (
                <option key={t} value={t}>
                  {TYPE_LABEL[t]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>진행 상태</label>
            <select name="status" defaultValue="WISHLIST" className={inputClass}>
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>제목 *</label>
            <input name="title" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>저자 *</label>
            <input name="author" required className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>출판사</label>
            <input name="publisher" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>ISBN</label>
            <input name="isbn" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>간단한 내용 (500자) *</label>
          <textarea name="summary" required maxLength={500} rows={4} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>느낀점</label>
            <textarea name="impression" rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>깨달은 점</label>
            <textarea name="insight" rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>적용점</label>
            <textarea name="application" rows={3} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>책 평가</label>
          <textarea name="review" rows={2} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <label className={labelClass}>별점 (0~5, 0.5단위)</label>
            <input type="number" name="rating" min={0} max={5} step={0.5} defaultValue={0} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>등급</label>
            <select name="grade" defaultValue="NORMAL" className={inputClass}>
              {GRADE_ORDER.map((g) => (
                <option key={g} value={g}>
                  {GRADE_LABEL[g]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>진행률 (%)</label>
            <input type="number" name="progress" min={0} max={100} defaultValue={0} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>선호 연령대</label>
            <select name="ageGroup" defaultValue="" className={inputClass}>
              <option value="">선택 안 함</option>
              {AGE_GROUPS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-2">
          <input type="checkbox" name="isPremium" className="h-4 w-4 accent-[var(--accent)]" />
          PRO 큐레이션(유료) 대상으로 표시
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
