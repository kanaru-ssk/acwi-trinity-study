import type { AcwiData } from '$lib/type/AcwiData';

export const payoutPeriods = [15, 20, 25, 30];
export const withdrawalRates = [3, 4, 5, 6, 7, 8, 9, 10];

// 取崩しシミュレーションデータを作成
// simulationMeta : 取崩し期間とシミュレーション回数の配列
// simulationResults : 取崩し期間と取崩し率の二元配列
export const makeSimulationData = async (acwiData: AcwiData[]) => {
	const simulationMeta = payoutPeriods.map((payoutPeriod) => ({
		payoutPeriod,
		numOfSimulation: 1 + acwiData.length - 12 * payoutPeriod
	}));

	const simulationResults = simulationMeta.map(({ payoutPeriod, numOfSimulation }) =>
		withdrawalRates.map((withdrawalRate) =>
			simulate(acwiData, payoutPeriod, withdrawalRate, numOfSimulation)
		)
	);

	return { simulationMeta, simulationResults };
};

// 取崩しシミュレーション
const simulate = (
	acwiData: AcwiData[],
	payoutPeriod: number,
	withdrawalRate: number,
	numOfSimulation: number
) => {
	let countFailure = 0;
	for (let i = 0; i < numOfSimulation; i++) {
		let amountRemaining = acwiData[i].price_jpy;
		const withdrawals = amountRemaining * withdrawalRate * 0.01;
		for (let pi = 0; pi < payoutPeriod; pi++) {
			if (pi !== 0)
				amountRemaining *= acwiData[i + 12 * pi].price_jpy / acwiData[i + 12 * (pi - 1)].price_jpy;

			amountRemaining -= withdrawals;
			if (amountRemaining < 0) {
				countFailure++;
				break;
			}
		}
	}
	return (numOfSimulation - countFailure) / numOfSimulation;
};
