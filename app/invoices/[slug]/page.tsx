import { Badge } from "@/components/ui/badge";
import { db } from "@/db/indext";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";

async function InvoicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [res] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, slug))
    .limit(1);

  return (
    <main className="mx-auto my-12 h-full max-w-5xl p-5">
      <div className="mb-8 flex justify-between">
        <h1 className="flex items-center justify-center gap-1.5 text-3xl font-bold">
          <span> invoict</span>
          <Badge
            className={cn(
              "mt-1.5",
              res.status === "open" && "bg-blue-500",
              res.status === "paid" && "bg-green-600",
              res.status === "void" && "bg-zinc-700",
              res.status === "uncollectible" && "bg-red-500",
            )}
          >
            {res.status}
          </Badge>
        </h1>
      </div>
      <p className="mb-3 text-3xl">${(res.value / 100).toFixed(2)}</p>

      <p className="mb-8 text-lg">{res.description}</p>

      <h2 className="mb-4 text-lg font-bold">Billing Details</h2>

      <ul className="grid gap-2">
        <li className="flex gap-4">
          <strong className="block w-28 shrink-0 text-sm">Invoice ID:</strong>
          <span>{res.id}</span>
        </li>

        <li className="flex gap-4">
          <strong className="block w-28 shrink-0 text-sm">Invoice Data:</strong>
          <span>{new Date(res.createTs).toLocaleDateString()}</span>
        </li>

        <li className="flex gap-4">
          <strong className="block w-28 shrink-0 text-sm">Invoice Name:</strong>
          <span></span>
        </li>

        <li className="flex gap-4">
          <strong className="block w-28 shrink-0 text-sm">
            Invoice Email:
          </strong>
          <span></span>
        </li>
      </ul>
    </main>
  );
}

export default InvoicePage;
