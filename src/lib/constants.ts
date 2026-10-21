import type { Grade, RecordStatus, RecordType } from "@/generated/prisma/enums";

export const GRADE_ORDER: Grade[] = ["CLASSIC", "TOP", "HIGH", "NORMAL", "BAD"];

export const GRADE_LABEL: Record<Grade, string> = {
  CLASSIC: "고전",
  TOP: "최상위",
  HIGH: "상위",
  NORMAL: "보통",
  BAD: "나쁨",
};

export const STATUS_ORDER: RecordStatus[] = ["IN_PROGRESS", "DONE", "WISHLIST"];

export const STATUS_LABEL: Record<RecordStatus, string> = {
  DONE: "읽은 것",
  IN_PROGRESS: "읽고 있는 것",
  WISHLIST: "읽고 싶은 것",
};

export const TYPE_ORDER: RecordType[] = ["BOOK", "VIDEO", "QUOTE", "AUDIO"];

export const TYPE_LABEL: Record<RecordType, string> = {
  BOOK: "도서",
  VIDEO: "동영상",
  QUOTE: "명언",
  AUDIO: "음원",
};

export const AGE_GROUPS = ["10대", "20대", "30대", "40대", "50대 이상"] as const;
