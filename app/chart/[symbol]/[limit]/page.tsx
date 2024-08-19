import { BarChart } from "@/components/charts/bar-chart"
import { BarChartSkeleton } from "@/components/charts/bar-chart-skeleton"
import { buttonVariants } from "@/components/ui/button"
import { stocks } from "@/lib/data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

// only paths returned by generateStaticParams will be served
export const dynamicParams = false

export async function generateStaticParams() {
  const limitOptions = ["100", "500", "1000", "5000"]
  return stocks.reduce(
    (acc, stock) =>
      acc.concat(
        limitOptions.map((limit) => ({
          symbol: stock.symbol,
          limit,
        }))
      ),
    [] as Params[]
  )
}

type Params = { symbol: string; limit: string }

type Props = {
  params: { symbol: string; limit: string }
}

export default async function ChartPage({
  params: { symbol, limit: limitStr },
}: Props) {
  const stock = stocks.find((one) => one.symbol === symbol)
  const limit = Number(limitStr)
  if (!stock || isNaN(limit)) {
    return notFound()
  }

  return (
    <div className="w-full min-h-screen flex flex-col  bg-zinc-50">
      <div className="max-w-6xl w-full  mx-auto flex flex-col px-4 py-10">
        <h1 className="text-4xl mb-2">{stock.displayName}</h1>
        <p className="mb-4">
          Note: This page is just a <em>placeholder</em> to handle link sharing
          and hard browser refresh from the stock chart modal.
        </p>
        <div className="h-96 w-full">
          <Suspense fallback={<BarChartSkeleton maxBarHeightPx={280} />}>
            <BarChart symbol={symbol} limit={limit} maxBarHeightPx={280} />
          </Suspense>
        </div>
        <div className="flex flex-col md:flex-row md:justify-end">
          <Link className={cn(buttonVariants({ variant: "default" }))} href="/">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
