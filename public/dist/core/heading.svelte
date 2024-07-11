<script lang="ts">let { type = "h1", children, style, clazz } = $props();
</script>

<svelte:element this={type} {style} class={clazz}>
	{@render children()}
</svelte:element>
