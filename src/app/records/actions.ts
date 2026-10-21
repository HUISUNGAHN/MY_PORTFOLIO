"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Grade, RecordStatus, RecordType } from "@/generated/prisma/enums";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function createRecord(formData: FormData) {
  const title = str(formData, "title");
  const author = str(formData, "author");
  const summary = str(formData, "summary");

  if (!title || !author || !summary) {
    throw new Error("제목, 저자, 간단한 내용은 필수입니다.");
  }

  const ratingRaw = Number(str(formData, "rating") || "0");
  const rating = Math.round(clamp(ratingRaw, 0, 5) * 2) / 2;
  const progress = Math.round(clamp(Number(str(formData, "progress") || "0"), 0, 100));

  await prisma.record.create({
    data: {
      title,
      author,
      summary,
      type: (str(formData, "type") || "BOOK") as RecordType,
      status: (str(formData, "status") || "WISHLIST") as RecordStatus,
      publisher: str(formData, "publisher") || null,
      isbn: str(formData, "isbn") || null,
      impression: str(formData, "impression") || null,
      insight: str(formData, "insight") || null,
      application: str(formData, "application") || null,
      review: str(formData, "review") || null,
      rating,
      grade: (str(formData, "grade") || "NORMAL") as Grade,
      progress,
      ageGroup: str(formData, "ageGroup") || null,
      isPremium: formData.get("isPremium") === "on",
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function deleteRecord(formData: FormData) {
  const id = str(formData, "id");
  if (!id) return;
  await prisma.record.delete({ where: { id } });
  revalidatePath("/");
}
