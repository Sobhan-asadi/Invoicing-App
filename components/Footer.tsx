import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0f0f1a]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold tracking-tight text-white">
              Invoicing-App
            </p>
            <p className="mt-2 max-w-sm text-sm text-white/60">
              Smart Invoicing-App with clean design and zero friction.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-white/80">Product</p>
              <Link href="#" className="text-white/60 hover:text-white">
                Features
              </Link>
              <Link href="#" className="text-white/60 hover:text-white">
                Pricing
              </Link>
              <Link href="#" className="text-white/60 hover:text-white">
                Docs
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-semibold text-white/80">Company</p>
              <Link href="#" className="text-white/60 hover:text-white">
                About
              </Link>
              <Link href="#" className="text-white/60 hover:text-white">
                Blog
              </Link>
              <Link href="#" className="text-white/60 hover:text-white">
                Careers
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-semibold text-white/80">Legal</p>
              <Link href="#" className="text-white/60 hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="text-white/60 hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Invoicipedia. All rights reserved.</p>

          <p className="text-white/40">Built with precision and taste ✦</p>
        </div>
      </div>
    </footer>
  );
}
