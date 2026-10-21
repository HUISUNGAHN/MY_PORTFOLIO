"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function setSubscription(formData: FormData) {
  const value = formData.get("value") === "true";
  const store = await cookies();
  store.set("pro_subscribed", value ? "1" : "0", { path: "/" });
  revalidatePath("/curation");
}
