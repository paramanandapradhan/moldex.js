<script lang="ts">
	type PropType = {
		id?: string;
		children?: any;
		containerStyle?: string;
		containerClass?: string;
	};

	let { id, children, containerStyle, containerClass }: PropType = $props();
</script>

<p {id} style={containerStyle} class="moldex moldex-html {containerClass}">
	{@render children()}
</p>
