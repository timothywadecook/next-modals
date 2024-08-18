"use client"
import { useMemo, useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function Bar({
  maxHeightPixels = 240,
  value,
  maxValue,
  minValue,
  label,
}: {
  value: number
  maxValue: number
  minValue: number
  label: string
  maxHeightPixels: number
}) {
  const [barHeight, barHeightScaled] = useMemo(() => {
    const normalizedHeight = (value - minValue) / (maxValue - minValue)
    const barHeight = Math.round(normalizedHeight * maxHeightPixels)
    const barHeightScaled = Math.round(barHeight * 1.2)
    return [barHeight, barHeightScaled]
  }, [value, maxValue, minValue, maxHeightPixels])

  const [h, setH] = useState(barHeight)
  const [display, setDisplay] = useState("block")

  const removeItem = () => {
    // simulate delete with display none - real project would use server actions
    setDisplay("none")
  }

  const scaleHeight = () => setH(barHeightScaled)
  const resetHeight = () => setH(barHeight)

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          onMouseEnter={scaleHeight}
          onMouseLeave={resetHeight}
          onClick={removeItem}
          style={{ height: h, display }}
          className="bg-green-300 w-4 hover:bg-green-600 transition-all duration-300 border-r border-white"
        />
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="flex items-center gap-x-2 text-sm">
          <span className="text-sm font-semibold">${value}</span>
          <span className="text-sm text-muted-foreground">{`${label}`}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
