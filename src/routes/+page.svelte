<script lang="ts">
	import Button from '$lib/views/core/button/components/button/button.svelte';
	import ColorField from '$lib/views/core/input/components/color-field/color-field.svelte';

	let value: string = $state('#ff0000');
</script>

<div class="min-h-full">
	<div class="p-6">
		<div>
			<ColorField label="Choose a color" bind:value />
		</div>
		<div class="my-4">
			<Button label="Submit" appearance="neutral" />
		</div>
	</div>
</div>
