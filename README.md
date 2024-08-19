This is a [Next.js](https://nextjs.org/) 14 project using app router, Tailwind CSS, and shadcn/ui.

## Getting Started

Download, install and then run the development server:

```bash
npm run dev
```

## API Key (Optional)

Add .env file with key for Alpha Vantage. Note: If _ALPHA_VANTAGE_KEY_ is not present, the dummy data in /lib/data.ts will be used - however this data is limited to about 2000 data points. See **.env.example** if needed.

## Tasks

- [x] Create your own bar charts without using any libraries for charts - just JS and CSS/tailwind.
- [x] Use NextJS 14 (app router with SSR) + Tailwind + Shadcn
- [x] Home page should have a picker with 20 stocks.
- [x] When a stock is selected it should open a Modal
- [x] Stock chart modal should display a bar chart of the stock price with X amount of data points
- [x] On hover over a bar - it should scale up in size/height
- [x] User should be able to change the number of data points being displayed (i.e. 100, 500, 1000, 5000)
- [x] Use a _stacked modal_ for changing number of data points being shown
- [x] Data must be loaded on the server (SSR)
- [x] Use server side components when you can and component boundaries for error + loading states
- [x] If you click a bar it deletes the data point. note: I only simulated a delete since I don't manage the data. For a regular delete I would use server actions and the updated UI would be returned in the same round trip.

## Notes about Solution

- Used parallel and intercepting routes for the main modal for first class routing support (gracefully handle forward/backward nav, link sharing, and hard refresh). So when a user selects a stock, the **@modal/chart...** route is used to render the modal. If a user clicks refresh or uses a direct link, the **/chart...** route in the root directory is provided as a fallback. This is currently just a fallback. Future work could develop it more.
- A "regular" modal is used for the settings modal which is how the user changes the amount of data points being displayed on the chart. This is currently only wired up on the main modal chart. But it could be added to the fallback chart page as well.
- When the user selects a stock, a suspense boundary is used to show the user a bar chart skeleton while the data is loading.
- Data is being fetched on server in the BarChart server component located in /components/charts/bar-chart.tsx.
- Dynamic routes are setup as /chart/[symbol]/[limit] where _symbol_ is the stock symbol and _limit_ is the amount of data to show.
- Dynamic routes are statically generated at build time for performance and only pre-approved routes will be served. If a user tries to manually go to _chart/TSLA/300_ they will see a not-found page from which they can return home by clicking the link.
- The fetch requests for daily data is set to revalidate every 12 hours.
