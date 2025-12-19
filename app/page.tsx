/** @format */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#0f0f1a] via-[#14142b] to-[#0f0f1a] px-6 text-white">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(108,71,255,0.25),transparent_55%)]" />

      <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Invoicipedia
        </h1>

        <p className="max-w-xl text-base text-white/70 sm:text-lg">
          Smart invoicing. Clean design. Zero friction.
        </p>

        {/* Logged out state */}
        <SignedOut>
          <div className="flex flex-col gap-4 sm:flex-row">
            <SignInButton>
              <Button className="cursor-pointer rounded-full px-8 py-6 text-base font-semibold">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button
                variant="outline"
                className="cursor-pointer rounded-full border-white/20 px-8 py-6 text-base font-semibold text-zinc-900 hover:bg-white/10 hover:text-white"
              >
                Create Account
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>

        {/* Logged in state */}
        <SignedIn>
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="rounded-full bg-linear-to-r from-[#6c47ff] to-[#8b6cff] px-10 py-6 text-base font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Link href="/dashboard">Go to Dashboard →</Link>
            </Button>
          </div>
        </SignedIn>
      </section>
    </main>
  );
}
