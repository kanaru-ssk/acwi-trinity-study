<script lang="ts">
	export let data;

	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
</script>

<main>
	<h1>【{year}年{month}月最新】</h1>

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
				<th>{data.payoutPeriods[i]} Year</th>
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
</main>

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
