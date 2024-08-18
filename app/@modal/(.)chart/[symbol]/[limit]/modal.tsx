"use client"

import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function Modal({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle: string
}) {
  const router = useRouter()

  function onDismiss() {
    router.back()
  }

  function onOpenChange(open: boolean) {
    // update router on close
    if (!open) {
      onDismiss()
    }
  }

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogClose />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subtitle}</DialogDescription>
          </DialogHeader>

          {children}
          <DialogFooter>
            <Button onClick={onDismiss}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
