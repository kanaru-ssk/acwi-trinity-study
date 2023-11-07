<script lang="ts">
	export let gistUrl = '';

	import { onMount } from 'svelte';

	let frame: HTMLIFrameElement;

	onMount(() => {
		frame.srcdoc = `<script src='${gistUrl}'><${''}/script>`;
	});
</script>

<iframe src="about:blank" bind:this={frame} title="Gist" />

<style>
	iframe {
		border: 0;
		width: 100%;
		height: 100%;
	}
</style>
