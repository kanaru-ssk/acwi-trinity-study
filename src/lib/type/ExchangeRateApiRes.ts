// Exchange Rate API のレスポンス形式
export type ExchangeRateApiRes = {
  success: boolean;
  timestamp: number;
  historical: boolean;
  base: string;
  date: string;
  rates: { JPY: number; USD: number };
};

export const isExchangeRateApiRes = (
  data: unknown,
): data is ExchangeRateApiRes =>
  typeof data === "object" &&
  data !== null &&
  "rates" in data &&
  typeof data.rates === "object" &&
  data.rates !== null &&
  "JPY" in data.rates &&
  "USD" in data.rates;
