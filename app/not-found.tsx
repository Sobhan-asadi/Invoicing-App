"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-zinc-400">404</p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Page not found
        </h1>

        <p className="mt-3 text-zinc-400">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
          >
            Go home
          </Link>

          <Link
            href="/dashboard"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800"
          >
            View invoices
          </Link>
        </div>
      </div>
    </div>
  );
}
