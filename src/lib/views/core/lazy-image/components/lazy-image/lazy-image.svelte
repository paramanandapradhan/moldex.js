<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type PropsType = {
		src?: string;
		imgClass?: string;
		imgStyle?: string;
		children?: Snippet;
	};
	let { src = '', imgClass = '', imgStyle = '', children }: PropsType = $props();
</script>

<img
	transition:fade
	{src}
	alt="Post"
	loading="lazy"
	class={`max-w-full max-h-full bg-gray-200 transition-opacity ease-in-out duration-1000 ${imgClass}`}
	style={imgStyle}
/>
