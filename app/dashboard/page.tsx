import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { db } from "@/db/indext";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";

import { CirclePlus } from "lucide-react";
import Link from "next/link";

async function Dashboard() {
  const results = await db.select().from(Invoices);

  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 text-center">
      <div className="mt-4 flex w-full items-center justify-between">
        <h1 className="text-5xl font-bold">Invoices</h1>
        <p>
          <Button variant="ghost" asChild>
            <Link href="invoices/new">
              <CirclePlus />
              Create Invoice
            </Link>
          </Button>
        </p>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-25 p-4 text-left">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4 text-left">Email</TableHead>
            <TableHead className="p-4 text-center">Status</TableHead>
            <TableHead className="p-4 text-right">Value</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {results.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-left">
                <Link
                  className="inline-block p-5 font-medium"
                  href={`/invoices/${item.id}`}
                >
                  {new Date(item.createTs).toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="text-left">
                <Link
                  className="inline-block p-5"
                  href={`/invoices/${item.id}`}
                >
                  {item.value}
                </Link>
              </TableCell>
              <TableCell className="text-left">
                <Link
                  className="inline-block p-5"
                  href={`/invoices/${item.id}`}
                >
                  fry@email.com
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <Link
                  className="inline-block p-5"
                  href={`/invoices/${item.id}`}
                >
                  <Badge
                    className={cn(
                      "mt-1.5 capitalize",
                      item.status === "open" && "bg-blue-500",
                      item.status === "paid" && "bg-green-600",
                      item.status === "void" && "bg-zinc-700",
                      item.status === "uncollectible" && "bg-red-500",
                    )}
                  >
                    {item.status}
                  </Badge>
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Link
                  className="inline-block p-5"
                  href={`/invoices/${item.id}`}
                >
                  ${(item.value / 100).toFixed(2)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

export default Dashboard;
