"use client"

import { useParams, useRouter } from "next/navigation"
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
import { ModalSettings } from "./modal-settings"

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
  const { limit } = useParams()

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
        <DialogContent onFocusCapture={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subtitle}</DialogDescription>
          </DialogHeader>

          {children}
          <DialogFooter>
            <div className="flex flex-1 items-center justify-center sm:justify-normal">
              <span className="text-sm text-muted-foreground">
                Showing <strong>{limit}</strong> data points
              </span>
            </div>
            <ModalSettings />
            <Button onClick={onDismiss}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
