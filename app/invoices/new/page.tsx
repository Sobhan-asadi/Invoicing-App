"use client";

import { createAction } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form";
import { FormEvent, useState } from "react";

function InvoiceNew() {
  const [state, setState] = useState("ready");

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (state === "pending") {
      e.preventDefault();
      return;
    }
    setState("pending");
  };

  return (
    <main className="relative min-h-screen bg-[#0b0b12] px-6 py-20 text-white">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_10%,rgba(108,71,255,0.15),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_80%_80%,rgba(140,120,255,0.12),transparent)]" />

      <div className="relative mx-auto max-w-2xl">
        {/* Title */}
        <h1 className="text-4xl font-semibold tracking-tight">New Invoice</h1>
        <p className="mt-2 text-sm text-white/50">
          Create a professional invoice in seconds.
        </p>

        {/* Form */}
        <Form
          action={createAction}
          onSubmit={handleOnSubmit}
          className="mt-12 space-y-10"
        >
          <div className="space-y-6">
            <Input
              name="name"
              placeholder="Client name"
              className="h-14 rounded-xl border border-white/10 bg-white/5 text-base placeholder:text-white/30 focus:border-[#6c47ff]"
            />

            <Input
              name="email"
              type="email"
              placeholder="Client email"
              className="h-14 rounded-xl border border-white/10 bg-white/5 text-base placeholder:text-white/30 focus:border-[#6c47ff]"
            />

            <Input
              name="value"
              placeholder="Invoice amount"
              className="h-14 rounded-xl border border-white/10 bg-white/5 text-base placeholder:text-white/30 focus:border-[#6c47ff]"
            />

            <Textarea
              name="description"
              placeholder="Description (optional)"
              className="min-h-35 rounded-xl border border-white/10 bg-white/5 text-base placeholder:text-white/30 focus:border-[#6c47ff]"
            />
          </div>

          <div className="pt-4">
            <SubmitButton />
          </div>
        </Form>
      </div>
    </main>
  );
}

export default InvoiceNew;
