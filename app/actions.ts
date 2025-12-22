"use server";

import { db } from "@/db/indext";
import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Stripe from "stripe";

const stripe = new Stripe(String(process.env.STRIPE_API_SECRET));

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

export async function deleteInvoiceAction(formData: FormData) {
  const idRaw = formData.get("id");

  if (!idRaw) {
    throw new Error("Missing invoice id");
  }

  const id = Number(idRaw);
  if (isNaN(id)) {
    throw new Error("Invalid invoice id");
  }

  await db.delete(Invoices).where(eq(Invoices.id, id));

  redirect("/dashboard");
}

export async function createPayment(formData: FormData) {
  const origin = headers().get("origin");
  const id = Number(formData.get("id"));

  if (!id) {
    throw new Error("Invalid invoice id");
  }

  const [result] = await db
    .select({
      status: Invoices.status,
      value: Invoices.value,
    })
    .from(Invoices)
    .where(eq(Invoices.id, id))
    .limit(1);

  if (!result) {
    throw new Error("Invoice not found");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: result.value,
          product_data: {
            name: `Invoice #${id}`,
            description: "Invoice payment",
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/invoices/${id}?success=true`,
    cancel_url: `${origin}/invoices/${id}?canceled=true`,
  });

  if (!session.url) {
    throw new Error("Invalid Session");
  }

  redirect(session.url);
}
