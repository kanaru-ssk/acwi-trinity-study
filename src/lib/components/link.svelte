<script lang="ts">
  import type { HTMLAttributeAnchorTarget } from "svelte/elements";
  export let href: string;
  export let text: string;
  export let target: HTMLAttributeAnchorTarget | undefined;
</script>

<a
  {href}
  {target}
  rel={target === "_blank" ? "noopener noreferrer" : ""}
  class="text-blue-900 underline">{text}</a
>
