<script lang="ts">
	export let data: {
		withdrawalRates: number[];
		simulationMeta: {
			payoutPeriod: number;
			numOfSimulation: number;
		}[];
		simulationResults: number[][];
		firstDataDate: Date;
		lastDataDate: Date;
	};
</script>

<div>
	<table>
		<thead>
			<tr>
				<th class="left-header">Payout Period</th>
				{#each data.withdrawalRates as rate}
					<th>{rate}%</th>
				{/each}
			</tr>
		</thead>
		<tbody />
		{#each data.simulationResults as results, i}
			<tr>
				<th class="left-header">
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
</div>

<p>
	{data.firstDataDate.toLocaleDateString('ja-JP', { timeZone: 'Europe/London' })}
	~
	{data.lastDataDate.toLocaleDateString('ja-JP', { timeZone: 'Europe/London' })}
	のデータを使用してシミュレーションしています。
</p>

<style>
	div {
		display: block;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		border: 1px solid black;
	}

	table {
		white-space: nowrap;
		border-collapse: collapse;
		width: 100%;
		font-size: 12px;
	}

	th,
	td {
		padding: 4px 16px;
	}

	p {
		margin-top: 4px;
		font-size: 12px;
	}

	.left-header {
		width: 120px;
		text-align: left;
		position: sticky;
		left: 0;
		background-color: #fff;
	}
</style>
