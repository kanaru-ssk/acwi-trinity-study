<script lang="ts">
	import Table from './Table.svelte';

	export let acwiData: string[][];

	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
</script>

<main>
	<h1>【{year}年{month}月最新】日本版トリニティスタディ</h1>

	<Table headers={['日付', '基準価格(USD)', '基準価格(JPY)', 'JPY/USD']} data={acwiData} />
</main>
