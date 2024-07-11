<script lang="ts">
	type PropType = {
		children?: any;
		style?: string;
		clazz?: string;
	};

	let { children, style, clazz }: PropType = $props();
</script>

<p {style} class="moldex {clazz}">
	{@render children()}
</p>
