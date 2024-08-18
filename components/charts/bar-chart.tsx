import { getDailyCloseData } from "@/lib/services"
import { Bar } from "./bar"

type Props = {
  symbol: string
  limit: number
  maxBarHeightPx: number
}

const useMockData = true // because AlphaVantage limits free requests to 25 per day. if you have an api key for env.ALPHA_VANTAGE_KEY you can set to false to fetch actual data

export async function BarChart({
  symbol,
  limit,
  maxBarHeightPx, // the parent component should have a fixed height proportional (1.2x) to maxBarHeightPx.
}: Props) {
  const { data, maxValue, minValue } = await getDailyCloseData(
    symbol,
    limit,
    useMockData
  )

  return (
    <div className="flex items-end h-full overflow-x-scroll pb-4">
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
    </div>
  )
}
