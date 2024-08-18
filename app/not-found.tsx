import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-50">
      <h2 className="mb-2">The page you requested was not found.</h2>
      <Link className={cn(buttonVariants({ variant: "default" }))} href="/">
        Go Home
      </Link>
    </div>
  )
}
