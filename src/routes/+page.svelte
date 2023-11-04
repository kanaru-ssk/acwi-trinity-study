<script lang="ts">
	export let data;

	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
</script>

<main>
	<h1>【{year}年{month}月最新】日本版トリニティスタディ</h1>

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
		{#each data.simulation as dataOfPeriod}
			<tr>
				<th>{dataOfPeriod.payoutPeriod} Year</th>
				{#each dataOfPeriod.data as dataOfRate}
					<td>{Math.floor(100 * dataOfRate.successRate)}</td>
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
