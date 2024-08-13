<script lang="ts">
	import Progressbar from '$lib/progressbar/components/progressbar/progressbar.svelte';

	let value: number = $state(0);
</script>

<div class="p-10">
	<Progressbar {value} className="" showValue>
		{value}
	</Progressbar>
</div>
<div>
	<input type="number" bind:value />
</div>
