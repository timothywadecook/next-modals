import { Skeleton } from "../ui/skeleton"

type Props = {
  maxBarHeightPx: number
}

const skeletonData = Array.from({ length: 100 }, (v, i) => i)

export function BarChartSkeleton({ maxBarHeightPx }: Props) {
  return (
    <div className="flex items-end h-full overflow-x-scroll pb-4">
      {skeletonData.map((d) => (
        <div
          key={d}
          className="flex flex-col items-center hover:cursor-pointer"
        >
          <Skeleton
            style={{ height: d % 2 ? maxBarHeightPx : maxBarHeightPx * 0.7 }}
            className=" w-4 border-r border-white"
          />
        </div>
      ))}
    </div>
  )
}
