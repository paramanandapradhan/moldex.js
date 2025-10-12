<script lang="ts">
	import { handleScreenSizeUpdate } from '../../../../services';
	import { BROWSER } from 'esm-env';

	let innerWidth: number = $state(0);

	function screenSizeChanged(size: number) {
		handleScreenSizeUpdate(size);
	}

	$effect(() => {
		BROWSER && screenSizeChanged(innerWidth);
	});
</script>

<svelte:window bind:innerWidth />
