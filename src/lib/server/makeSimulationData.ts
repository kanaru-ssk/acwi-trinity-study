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
// チャートデータ、取崩し期間、取崩し率、試行回数を受け取って成功率(0~1)を返す
const simulate = (
	acwiData: AcwiData[],
	payoutPeriod: number,
	withdrawalRate: number,
	numOfSimulation: number
) => {
	let countFailure = 0; // 失敗回数
	for (let i = 0; i < numOfSimulation; i++) {
		let amountRemaining = acwiData[i].price_jpy; // 資産残高

		// 毎年の取崩し額: 初年度の資産額に取崩し率をかけた額
		const withdrawals = amountRemaining * withdrawalRate * 0.01;
		for (let pi = 0; pi < payoutPeriod; pi++) {
			if (pi !== 0) {
				const prePrice = acwiData[i + 12 * (pi - 1)].price_jpy; // 1年前の基準価格
				const price = acwiData[i + 12 * pi].price_jpy; // 当月の基準価格
				const PercentageChange = price / prePrice; // 騰落率

				// 資産残高に騰落率を掛ける
				amountRemaining *= PercentageChange;
			}

			// 資産残高から取崩し額を引く
			amountRemaining -= withdrawals;

			// 資産残高が0になったら失敗
			if (amountRemaining <= 0) {
				countFailure++;
				break;
			}
		}
	}

	return (numOfSimulation - countFailure) / numOfSimulation;
};
