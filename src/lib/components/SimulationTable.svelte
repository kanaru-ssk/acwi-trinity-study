<script lang="ts">
	export let data: {
		withdrawalRates: number[];
		simulationMeta: {
			payoutPeriod: number;
			numOfSimulation: number;
		}[];
		simulationResults: number[][];
	};
</script>

<table>
	<thead>
		<tr>
			<th>Payout Period</th>
			{#each data.withdrawalRates as rate}
				<th>{rate}%</th>
			{/each}
		</tr>
	</thead>
	<tbody />
	{#each data.simulationResults as results, i}
		<tr>
			<th>
				{data.simulationMeta[i].payoutPeriod} Year (n = {data.simulationMeta[i].numOfSimulation})
			</th>
			{#each results as result}
				{@const r = result < 0.5 ? 255 : 255 - 155 * 2 * (result - 0.5)}
				{@const g = result > 0.5 ? 255 : 100 + 155 * 2 * result}
				{@const b = 100}
				<td style:background-color="rgb({r},{g},{b})">
					{Math.floor(100 * result)}
				</td>
			{/each}
		</tr>
	{/each}
</table>

<style>
	table {
		border: 1px solid black;
		border-collapse: collapse;
		width: 100%;
	}
	th,
	td {
		border: 1px solid black;
		padding: 4px 16px;
	}
</style>
