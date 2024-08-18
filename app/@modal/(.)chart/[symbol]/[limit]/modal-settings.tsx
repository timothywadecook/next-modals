"use client"

import { useParams, useRouter } from "next/navigation"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogPortal } from "@radix-ui/react-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const options = [100, 500, 1000, 5000]

export function ModalSettings() {
  const router = useRouter()
  const { symbol, limit } = useParams()

  function onUpdateLimitSelection(_limit: number) {
    // using router.replace so the parent modal close/done behavior works as expected instead of going "back" to previous setting
    router.replace(`/chart/${symbol}/${_limit}`)
  }

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: "link" }))}>
        Settings
      </DialogTrigger>
      <DialogPortal>
        <DialogClose />
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>Set Data Limit</DialogTitle>
            <DialogDescription>
              You are currently viewing {limit} data points for {symbol}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-x-2">
            {options.map((l) => (
              <Button
                disabled={l === Number(limit)}
                onClick={() => onUpdateLimitSelection(l)}
                variant="secondary"
                key={l}
              >
                {l}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="link">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
