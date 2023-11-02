<script lang="ts">
	import Table from './Table.svelte';

	export let data: { acwiData: string[][]; jpyPerUsdData: string[][] };

	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
</script>

<main>
	<h1>【{year}年{month}月最新】日本版トリニティスタディ</h1>

	<Table headers={['日付', '基準価格']} data={data.acwiData} />

	<br />

	<Table
		headers={['日付け', '終値', '始値', '高値', '安値', '出来高', '変化率 %']}
		data={data.jpyPerUsdData}
	/>
</main>
