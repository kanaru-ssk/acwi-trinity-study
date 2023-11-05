<script lang="ts">
	import SimulationTable from '$lib/components/SimulationTable.svelte';
	export let data;

	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
	const title = `【${year}年${month}月最新】日本版トリニティスタディ`;
	const subTitle = 'ACWIを円建で取崩しシミュレーション';
</script>

<svelte:head>
	<title>{title} | {subTitle}</title>
</svelte:head>

<main>
	<h1>{title}</h1>
	<h2>{subTitle}</h2>

	<SimulationTable {data} />
</main>

<style>
	h1 {
		font-size: 24px;
		margin-bottom: 0;
	}

	h2 {
		font-size: 16px;
		font-weight: 400;
		margin-top: 0;
		padding-left: 16px;
	}
</style>
