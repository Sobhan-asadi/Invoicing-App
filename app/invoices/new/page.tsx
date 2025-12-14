"use client";

import { createAction } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, startTransition, useState } from "react";

function InvoiceNew() {
  const [state, setState] = useState("ready");

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "pending") return;
    setState("pending");

    const target = e.target as HTMLFormElement;

    startTransition(async () => {
      const formData = new FormData(target);
      await createAction(formData);
    });
  };

  return (
    <main className="mx-auto flex max-w-5xl flex-col justify-center gap-6">
      <div className="mt-4 flex w-full items-center justify-between">
        <h1 className="text-5xl font-bold">Create Invoice</h1>
      </div>

      <form
        action={createAction}
        onSubmit={handleOnSubmit}
        className="grid max-w-sm gap-4"
      >
        <div className="">
          <Label className="my-2 block text-sm font-semibold" htmlFor=" name">
            Billing Name
          </Label>
          <Input type="text" id="name" name="name" />
        </div>

        <div className="">
          <Label className="my-2 block text-sm font-semibold" htmlFor="email">
            Email
          </Label>
          <Input type="email" id="email" name="email" />
        </div>

        <div className="">
          <Label className="my-2 block text-sm font-semibold" htmlFor="value">
            Value
          </Label>
          <Input type="text" id="value" name="value" />
        </div>

        <div className="">
          <Label
            className="my-2 block text-sm font-semibold"
            htmlFor="description"
          >
            Description
          </Label>
          <Textarea name="description" id="description"></Textarea>
        </div>
        <div className="">
          <SubmitButton />
        </div>
      </form>
    </main>
  );
}

export default InvoiceNew;
