import type { AcwiData } from '$lib/type/AcwiData';

export const payoutPeriods = [15, 20, 25, 30];
export const withdrawalRates = [3, 4, 5, 6, 7, 8, 9, 10];

export const makeSimulationData = async (acwiData: AcwiData[]) =>
	payoutPeriods.map((payoutPeriod) =>
		withdrawalRates.map((withdrawalRate) => simulate(acwiData, payoutPeriod, withdrawalRate))
	);

const simulate = (acwiData: AcwiData[], payoutPeriod: number, withdrawalRate: number) => {
	const numOfSimulation = 1 + acwiData.length - 12 * payoutPeriod;

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
