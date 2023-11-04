import { fetchAcwiData } from '$lib/server/fetchAcwiData';
import { simulate } from '$lib/server/simulate';

export const prerender = true;

export const load = async () => {
	const acwiData = await fetchAcwiData();

	// TODO: fetchOriginalAcwiDataで最新データ取得
	// TODO: 最新データがある場合は為替データ取得
	// TODO: 最新データをMongoDBにinsert

	const simulation = await simulate(acwiData);
	console.log(simulation);

	const acwiDataStr = acwiData.map((v) => {
		return [
			v.date.toLocaleDateString(),
			String(v.price_usd),
			String(v.price_jpy),
			String(v.jpy_usd)
		];
	});

	return { acwiData: acwiDataStr };
};
