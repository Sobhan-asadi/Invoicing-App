"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#0f0f1c] via-[#141428] to-black px-6 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
        <h1 className="mb-4 text-3xl font-extrabold text-red-400">
          Something went wrong
        </h1>

        <p className="mb-6 text-white/80">
          {error.message || "An unexpected error has occurred."}
        </p>

        {process.env.NODE_ENV === "development" && error.digest && (
          <p className="mb-6 text-sm text-white/40">
            Error Digest: {error.digest}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Try again
          </button>

          <Link
            href="/"
            className="rounded-xl border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
