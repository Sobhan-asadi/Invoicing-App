import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-white hover:opacity-90"
          >
            Invoicing<span className="text-[#6c47ff]">.</span>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button
                variant="ghost"
                className="rounded-full px-6 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button
              asChild
              variant="outline"
              className="hidden gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20 md:flex"
            >
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 rounded-full ring-2 ring-white/20",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
