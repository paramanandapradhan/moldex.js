<script lang="ts">
	import { handleScreenSizeUpdate } from '$lib/services/index.js';

	import { onMount } from 'svelte';

	let innerWidth: number = $state(0);

	function screenSizeChanged(size: number) {
		handleScreenSizeUpdate(size);
	}

	onMount(() => {
		screenSizeChanged(innerWidth);
	});
</script>

<svelte:window bind:innerWidth />
