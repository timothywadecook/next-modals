import { getDailyCloseData } from "@/lib/services"
import { Bar } from "./bar"
import { TooltipProvider } from "../ui/tooltip"

type Props = {
  symbol: string
  limit: number
  maxBarHeightPx: number
}

export async function BarChart({
  symbol,
  limit,
  maxBarHeightPx, // the parent component should have a fixed height proportional (1.2x) to maxBarHeightPx.
}: Props) {
  const { data, maxValue, minValue } = await getDailyCloseData(symbol, limit)

  return (
    <div className="h-full w-full pb-10">
      <div className="flex items-end h-full overflow-x-scroll">
        <TooltipProvider disableHoverableContent delayDuration={0}>
          {data.map((d, i) => (
            <Bar
              key={i}
              label={d.date}
              value={d.value}
              maxValue={maxValue}
              minValue={minValue}
              maxHeightPixels={maxBarHeightPx}
            />
          ))}
        </TooltipProvider>
      </div>
    </div>
  )
}
