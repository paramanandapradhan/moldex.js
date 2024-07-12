<script lang="ts">
	type PropType = {
		id?: string;
		type?: string | 'div' | 'span';
		children?: any;
		containerStyle?: string;
		containerClass?: string;
	};

	let { id, type, children, containerStyle, containerClass }: PropType = $props();
</script>

{#if type}
	<svelte:element this={type} {id} style={containerStyle} class="moldex moldex-html {containerClass}">
		{@html children()}
	</svelte:element>
{:else}
	{@html children()}
{/if}
