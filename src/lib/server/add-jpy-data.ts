import type { AcwiData } from '$lib/type/AcwiData';
import { fetchExchangeRate } from '$lib/server/fetch-exchange-rate';

// Exchange Rate API からドル円レートをフェッチし、AcwiDataを完成させる
export const addJpyData = async (
	latestData: Omit<AcwiData, 'price_jpy' | 'jpy_usd'>[]
): Promise<AcwiData[]> => {
	const dataWithJpy = await Promise.all(
		latestData.map(async ({ date, price_usd }) => {
			const jpy_usd = await fetchExchangeRate(date);
			if (!jpy_usd) return null;

			const price_jpy = price_usd * jpy_usd;
			return {
				date,
				price_usd,
				price_jpy,
				jpy_usd
			};
		})
	);
	return dataWithJpy.filter((v): v is AcwiData => v !== null);
};
