
export const SingleCoin = (id) =>
`https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id,days = 365) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;

 