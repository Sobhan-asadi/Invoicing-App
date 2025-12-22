import { Badge } from "@/components/ui/badge";
import { db } from "@/db/indext";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { deleteInvoiceAction, updatStatusAction } from "@/app/actions";
import { DeleteInvoiceDialog } from "@/components/DeleteInvoiceDialog";
import PayButton from "@/components/PayButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const AVAILABLE_STATUSES = [
  { id: "open", label: "Open" },
  { id: "paid", label: "Paid" },
  { id: "void", label: "Void" },
  { id: "uncollectible", label: "Uncollectible" },
];

async function InvoicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [res] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, slug))
    .limit(1);

  if (!res) notFound();

  return (
    <main className="min-h-screen bg-linear-to-br from-[#0f0f1c] via-[#141428] to-black px-6 py-14 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Invoice #{res.id}
              </h1>

              <Badge
                className={cn(
                  "px-6 py-1 text-sm font-semibold tracking-wide",
                  res.status === "open" &&
                    "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30",
                  res.status === "paid" &&
                    "bg-green-500/20 text-green-400 ring-1 ring-green-500/30",
                  res.status === "void" &&
                    "bg-zinc-500/20 text-zinc-300 ring-1 ring-zinc-500/30",
                  res.status === "uncollectible" &&
                    "bg-red-500/20 text-red-400 ring-1 ring-red-500/30",
                )}
              >
                {res.status}
              </Badge>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white text-black">
                    Change Status
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-48">
                  {AVAILABLE_STATUSES.map((status) => (
                    <DropdownMenuItem key={status.id} asChild>
                      <form action={updatStatusAction}>
                        <input type="hidden" name="id" value={res.id} />
                        <input type="hidden" name="status" value={status.id} />
                        <button
                          type="submit"
                          className="w-full text-left font-medium"
                        >
                          {status.label}
                        </button>
                      </form>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <form action={deleteInvoiceAction}>
                <input type="hidden" name="id" value={res.id} />

                <DeleteInvoiceDialog id={res.id} />
              </form>
            </div>
          </div>

          <p className="text-5xl font-extrabold tracking-tight">
            ${(res.value / 100).toFixed(2)}
          </p>

          {res.description && (
            <p className="max-w-3xl text-lg text-white/70">{res.description}</p>
          )}
        </div>

        {/* Content */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Details */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-xl font-bold">Invoice Details</h2>

            <div className="space-y-4">
              {[
                ["Invoice ID", res.id],
                ["Date", new Date(res.createTs).toLocaleDateString()],
                ["Customer Name", res.customerName || "_"],
                ["Customer Email", res.customerEmail || "-"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl bg-black/30 px-5 py-3"
                >
                  <span className="text-sm text-white/60">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
              <PayButton invoiceId={res.id} />
            </div>
          </section>

          {/* Summary / Placeholder */}
          <section className="flex flex-col justify-center rounded-3xl border border-white/10 bg-linear-to-br from-[#6c47ff]/20 to-[#8b6cff]/10 p-8">
            <h3 className="mb-4 text-2xl font-bold">Invoice Summary</h3>
            <p className="text-white/70">
              This invoice reflects the total billed amount including any
              applicable adjustments. Status updates are applied immediately and
              tracked securely.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
export default InvoicePage;
