import { fetchAcwiDataFromMongo } from '$lib/server/fetchAcwiDataFromMongo';
import { fetchAcwiDataFromMsci } from '$lib/server/fetchAcwiDataFromMsci';
import { fetchExchangeRate } from '$lib/server/fetchExchangeRate';
import { insertToMongo } from '$lib/server/insertToMongo';
import { makeSimulationData, payoutPeriods, withdrawalRates } from '$lib/server/makeSimulationData';
import type { AcwiData } from '$lib/type/AcwiData';
export const prerender = true;

export const load = async () => {
	const acwiData = await fetchAcwiDataFromMongo();

	const lastDataDate = acwiData[acwiData.length - 1].date;

	const latestData = await fetchAcwiDataFromMsci(lastDataDate);

	if (latestData) {
		const newAcwiData: (AcwiData | null)[] = await Promise.all(
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

		await Promise.all(
			newAcwiData.map(async (v) => {
				if (v) {
					const insertedData = await insertToMongo(v);
					acwiData.push(insertedData);
				}
			})
		);
	}

	const simulationResults = await makeSimulationData(acwiData);

	return { simulationResults, payoutPeriods, withdrawalRates };
};
