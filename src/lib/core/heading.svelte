<script lang="ts">
	type PropType = {
		type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		children?: any;
		style?: string;
		clazz?: string;
	};

	let { type = 'h1', children, style, clazz }: PropType = $props();
</script>

<svelte:element this={type} {style} class={clazz}>
	{@render children()}
</svelte:element>
