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
import { CirclePlus } from "lucide-react";
import Link from "next/link";

function Dashboard() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 text-center">
      <div className="mt-4 flex w-full items-center justify-between">
        <h1 className="text-5xl font-bold">Invoices</h1>
        <p>
          <Button variant="ghost" asChild>
            <Link href="">
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
            <TableHead className="w-[100px] p-4 text-left">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4 text-left">Email</TableHead>
            <TableHead className="p-4 text-center">Status</TableHead>
            <TableHead className="p-4 text-right">Value</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="p-5 text-left font-medium">
              <span>8/9/2025</span>
            </TableCell>
            <TableCell className="p-5 text-left">
              <span>Paid</span>
            </TableCell>
            <TableCell className="p-5 text-left">
              <span>fry@email.com</span>
            </TableCell>
            <TableCell className="p-5 text-center">
              <span>
                <Badge className="cursor-pointer">Open</Badge>
              </span>
            </TableCell>
            <TableCell className="p-5 text-right">
              <span>$250.00</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}

export default Dashboard;
