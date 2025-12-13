import { sql } from "drizzle-orm";
import { db } from "../../../db/indext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

async function InvoiceNew() {
  const res = await db.execute(sql`SELECT current_database()`);
  console.log(res);

  return (
    <main className="mx-auto flex max-w-5xl flex-col justify-center gap-6">
      <div className="mt-4 flex w-full items-center justify-between">
        <h1 className="text-5xl font-bold">Create Invoice</h1>
      </div>
      {JSON.stringify(res)}
      <form className="grid max-w-sm gap-4">
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
          <Button className="w-full cursor-pointer font-semibold">
            submit
          </Button>
        </div>
      </form>
    </main>
  );
}

export default InvoiceNew;
