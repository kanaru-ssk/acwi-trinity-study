import { fetchAcwiDataFromMongo } from '$lib/server/fetchAcwiDataFromMongo';
import { fetchAcwiDataFromMsci } from '$lib/server/fetchAcwiDataFromMsci';
import { makeSimulationData, payoutPeriods, withdrawalRates } from '$lib/server/makeSimulationData';

export const prerender = true;

export const load = async () => {
	const acwiData = await fetchAcwiDataFromMongo();

	const lastDataDate = acwiData[acwiData.length - 1].date;

	const originData = await fetchAcwiDataFromMsci(lastDataDate);
	console.log(originData);
	// TODO: 最新データがある場合は為替データ取得
	// TODO: 最新データをMongoDBにinsert

	const simulationResults = await makeSimulationData(acwiData);

	return { simulationResults, payoutPeriods, withdrawalRates };
};
