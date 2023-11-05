import { env } from '$env/dynamic/private';
import { isExchangeRateApiRes } from '$lib/type/ExchangeRateApiRes';

export const fetchExchangeRate = async (date: Date): Promise<number | null> => {
	const endpoint = 'http://api.exchangeratesapi.io/v1';
	const targetDateStr = date.toISOString().split('T')[0];
	const accessKey = `access_key=${env.EXCHANGE_RATE_API_KEY}`;
	const symbols = 'symbols=JPY,USD';

	const res = await fetch(`${endpoint}/${targetDateStr}?${accessKey}&${symbols}`);
	if (!res.ok) return null;

	const data = await res.json();
	if (!isExchangeRateApiRes(data)) return null;

	return data.rates.JPY / data.rates.USD;
};
