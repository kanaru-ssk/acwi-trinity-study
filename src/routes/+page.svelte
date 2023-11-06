<script lang="ts">
	import SimulationTable from '$lib/components/SimulationTable.svelte';
	import DescriptionSections from '$lib/components/DescriptionSections.svelte';
	export let data;

	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
	const monthStr = `${year}年${month}月`;
	const title = `【${monthStr}月最新】日本版トリニティスタディ`;
	const description = `eMAXIS Slim 全世界株式（オール・カントリー）が連動する、MSCI ACWIを日本円建てで取崩しシミュレーション。4%ルールが日本でも再現性のある投資方法なのか検証しました。`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://trinity-study.kanaru.jp" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="trinity study in japan" />
	<meta property="og:image" content="https://trinity-study.kanaru.jp/ogp.png" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@kanaru_ssk" />
</svelte:head>

<main>
	<h1>{title}</h1>

	<SimulationTable {data} />

	<DescriptionSections />
</main>
