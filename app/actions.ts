"use server";

import { db } from "@/db/indext";
import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createAction(formData: FormData) {
  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = formData.get("description") as string;

  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      status: "open",
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${results[0].id}`);
}

export async function updatStatusAction(formData: FormData) {
  const idRaw = formData.get("id");
  const status = formData.get("status") as string;

  if (!idRaw || !status) {
    throw new Error("Missing id or status");
  }

  const id = Number(idRaw);
  if (isNaN(id)) {
    throw new Error("Invalid invoice id");
  }

  await db.update(Invoices).set({ status }).where(eq(Invoices.id, id));

  redirect(`/invoices/${id}`);
}
