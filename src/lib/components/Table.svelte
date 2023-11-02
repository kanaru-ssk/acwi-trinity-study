<script lang="ts">
	export let headers: string[];
	export let data: string[][];
</script>

<table>
	<thead>
		<tr>
			{#each headers as header}
				<th>{header}</th>
			{/each}
		</tr>
	</thead>
	<tbody />
	{#each data as row}
		<tr>
			{#each row as data}
				<td>{data || ''}</td>
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
