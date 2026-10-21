import { deleteRecord } from "@/app/records/actions";

export function DeleteRecordButton({ id }: { id: string }) {
  return (
    <form action={deleteRecord}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label="기록 삭제"
        className="flex-shrink-0 rounded-md px-1.5 text-ink-3 transition-colors hover:text-accent"
      >
        ✕
      </button>
    </form>
  );
}
