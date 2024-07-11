<script lang="ts">
	type PropType = {
		type?: string | 'div' | 'span';
		children?: any;
		style?: string;
		clazz?: string;
	};

	let { type, children, style, clazz }: PropType = $props();
</script>

{#if type}
	<svelte:element this={type} {style} class="moldex {clazz}">
		{@html children()}
	</svelte:element>
{:else}
	{@html children()}
{/if}
