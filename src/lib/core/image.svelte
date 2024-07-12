<script lang="ts">
	type PropType = {
		id?: string;
		children?: any;
		containerStyle?: string;
		containerClass?: string;
		src?: string;
		alt?: string;
		lazyLoad?: boolean;
	};

	let {
		id,
		src,
		alt = 'Placeholder',
		containerStyle,
		containerClass,
		lazyLoad = false
	}: PropType = $props();
</script>

<img
	{id}
	{src}
	class="moldex moldex-image {containerClass}"
	style={containerStyle}
	{alt}
	loading={lazyLoad ? 'eager' : 'lazy'}
/>
