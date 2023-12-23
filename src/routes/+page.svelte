<script lang="ts">
  import {
    DescriptionSections,
    SimulationTable,
    Heading1,
  } from "$lib/components";
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

<main class="mx-auto max-w-4xl px-4">
  <Heading1>{title}</Heading1>

  <SimulationTable {data} />

  <DescriptionSections />
</main>
