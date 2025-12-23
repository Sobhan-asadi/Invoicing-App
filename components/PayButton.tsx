"use client";

import { createPayment } from "@/app/actions";
import { CreditCard } from "lucide-react";

export default function PayButton({ invoiceId }: { invoiceId: number }) {
  async function handlePay(formData: FormData) {
    const res = await createPayment(formData);

    if (res?.url) {
      window.location.href = res.url;
    }
  }

  return (
    <form action={handlePay} className="w-full">
      <input type="hidden" name="id" value={invoiceId} />

      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
      >
        Pay securely with Stripe <CreditCard />
      </button>
    </form>
  );
}
