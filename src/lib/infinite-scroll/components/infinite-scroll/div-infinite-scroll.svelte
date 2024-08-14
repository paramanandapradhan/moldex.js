<script lang="ts">
	import { BROWSER } from 'esm-env';
	import type { Snippet } from 'svelte';
    
	type PropsType = {
		triggerDistance?: number;
		children?: Snippet;
	};

	let { triggerDistance = 400, children }: PropsType = $props();
	let ref: HTMLDivElement;

	let isTrigger: boolean = false;

	const calculateScroll = () => {
		if (BROWSER && ref) {
			let contentHeight = ref.scrollHeight - ref.offsetHeight;
			let scrollDistance = contentHeight - ref.scrollTop - 16;
			if (scrollDistance < triggerDistance) {
				if (!isTrigger) {
					isTrigger = true;
					ref.dispatchEvent(new CustomEvent('loadMore'));
				}
			} else {
				isTrigger = false;
			}
		}
	};

	const handleScroll = () => {
		calculateScroll();
	};
</script>

<div
	id="infinite-scroller"
	class="h-full w-full overflow-y-auto"
	bind:this={ref}
	onscroll={handleScroll}
>
	{#if children}
		{@render children()}
	{/if}
</div>
