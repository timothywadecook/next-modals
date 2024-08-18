import { dailyDataSample } from "./data"

export async function getDailyCloseData(
  symbol: string,
  limit: number,
  useMockData = true
) {
  let timeSeries: {
    [date: string]: {
      "1. open": string
      "2. high": string
      "3. low": string
      "4. close": string
      "5. volume": string
    }
  } = dailyDataSample["Time Series (Daily)"]

  if (!useMockData) {
    const result = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${process.env.ALPHA_VANTAGE_KEY}`,
      { next: { revalidate: 3600 * 12 } } // revalidate daily data every 12 hrs
    ).then((res) => res.json())

    timeSeries = result
  }

  // Convert the time series object to an array, limit the result count, and identify max/min vals
  const data: { date: string; type: string; value: number }[] = []
  let maxValue = 0
  let minValue = 0

  const timestamps = Object.keys(timeSeries)

  const lesserOfLimitOrData = Math.min(limit, timestamps.length)

  for (let i = 0; i < lesserOfLimitOrData; i++) {
    const timestamp = timestamps[i]
    const value = Number(timeSeries[timestamp]["4. close"])

    data.push({
      date: timestamp,
      type: "close",
      value,
    })
    if (value > maxValue) {
      maxValue = value
    }
    if (value < minValue) {
      minValue = value
    }
  }

  return { data, maxValue, minValue }
}
