<script lang="ts">
	type PropType = {
		id?: string;
		type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		children?: any;
		containerStyle?: string;
		containerClass?: string;
	};

	let {id,  type = 'h1', children, containerStyle, containerClass }: PropType = $props();
</script>

<svelte:element {id} this={type} style={containerStyle} class="moldex moldex-html {containerClass}">
	{@render children()}
</svelte:element>
