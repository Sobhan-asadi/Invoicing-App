/** @format */
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-5xl font-bold">Invoicipedia</h1>

      <Button asChild>
        <Link href="/dashboard">Sign In</Link>
      </Button>
    </main>
  );
}
