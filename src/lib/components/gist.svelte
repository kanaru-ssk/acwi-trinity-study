<script lang="ts">
  export let gistUrl = "";

  import { onMount } from "svelte";

  let frame: HTMLIFrameElement;

  onMount(() => {
    frame.srcdoc = `<script src='${gistUrl}'><${""}/script>`;
  });
</script>

<iframe
  src="about:blank"
  bind:this={frame}
  title="Gist"
  class="h-full w-full border-none"
/>
