"use client" // Error boundaries must be Client Components

import { useEffect } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-50">
      <h2 className="mb-2">Oops. Something went wrong!</h2>
      <Link className={cn(buttonVariants({ variant: "default" }))} href="/">
        Go Home
      </Link>
    </div>
  )
}
