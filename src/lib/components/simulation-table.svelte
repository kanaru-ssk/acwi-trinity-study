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

<div class="overflow-x-auto border border-black">
  <table class="w-full border-collapse whitespace-nowrap text-xs">
    <thead>
      <tr>
        <th class="sticky left-0 w-32 bg-white px-4 py-1 text-left"
          >Payout Period</th
        >
        {#each data.withdrawalRates as rate}
          <th class="px-4 py-1">{rate}%</th>
        {/each}
      </tr>
    </thead>
    <tbody />
    {#each data.simulationResults as results, i}
      <tr>
        <th class="sticky left-0 w-32 bg-white px-4 py-1 text-left">
          {data.simulationMeta[i].payoutPeriod} Year (n = {data.simulationMeta[
            i
          ].numOfSimulation})
        </th>
        {#each results as result}
          {@const r = result < 0.5 ? 255 : 255 - 155 * 2 * (result - 0.5)}
          {@const g = result > 0.5 ? 255 : 100 + 155 * 2 * result}
          {@const b = 100}
          <td style:background-color="rgb({r},{g},{b})" class="px-4 py-1">
            {Math.floor(100 * result)}
          </td>
        {/each}
      </tr>
    {/each}
  </table>
</div>

<p class="mt-1 text-xs">
  {data.firstDataDate.toLocaleDateString("ja-JP", {
    timeZone: "UTC",
  })}
  ~
  {data.lastDataDate.toLocaleDateString("ja-JP", { timeZone: "UTC" })}
  のデータを使用してシミュレーションしています。
</p>
