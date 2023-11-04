import { fetchAcwiDataFromMongo } from '$lib/server/fetchAcwiDataFromMongo';
import { makeSimulationData, payoutPeriods, withdrawalRates } from '$lib/server/makeSimulationData';

export const prerender = true;

export const load = async () => {
	const acwiData = await fetchAcwiDataFromMongo();

	// TODO: fetchAcwiDataFromOriginで最新データ取得
	// TODO: 最新データがある場合は為替データ取得
	// TODO: 最新データをMongoDBにinsert

	const simulationResults = await makeSimulationData(acwiData);

	return { simulationResults, payoutPeriods, withdrawalRates };
};
