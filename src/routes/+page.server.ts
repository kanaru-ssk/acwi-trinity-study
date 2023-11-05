import { error } from '@sveltejs/kit';
import { addJpyData } from '$lib/server/addJpyData';
import { fetchAcwiDataFromMongo } from '$lib/server/fetchAcwiDataFromMongo';
import { fetchAcwiDataFromMsci } from '$lib/server/fetchAcwiDataFromMsci';
import { insertToMongo } from '$lib/server/insertToMongo';
import { makeSimulationData, withdrawalRates } from '$lib/server/makeSimulationData';
import type { AcwiData } from '$lib/type/AcwiData';

export const load = async () => {
	// MongoDBからチャートデータフェッチ
	const acwiData = await fetchAcwiDataFromMongo();
	if (!acwiData)
		throw error(404, {
			message: 'Not found'
		});

	// MSCIから最新チャートデータフェッチ
	const lastDataDate = acwiData[acwiData.length - 1].date;
	const latestData = await fetchAcwiDataFromMsci(lastDataDate);

	if (latestData) {
		// MSCIデータに日本円データ追加
		const newAcwiData: AcwiData[] = await addJpyData(latestData);

		// 最新チャートデータをMongoDBに追加
		// acwiDataに最新データ追加
		await Promise.all(
			newAcwiData.map(async (data) => {
				const insertedData = await insertToMongo(data);
				acwiData.push(insertedData);
			})
		);
	}

	// 取崩しシミュレーション実行
	const { simulationMeta, simulationResults } = await makeSimulationData(acwiData);

	return { withdrawalRates, simulationMeta, simulationResults };
};

export const prerender = true;

export const config = {
	isr: {
		expiration: 60 * 60 * 24 * 30 // 30日毎にデータ更新
	}
};
