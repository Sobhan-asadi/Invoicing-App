"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  console.log(pending);

  return (
    <Button className="relative w-full cursor-pointer font-semibold">
      <span className={pending ? "text-transparent" : ""}>submit</span>
      {pending && (
        <span className="absolute flex h-full w-full items-center justify-center text-gray-400">
          <LoaderCircle className="animate-spin" />
        </span>
      )}
    </Button>
  );
}
