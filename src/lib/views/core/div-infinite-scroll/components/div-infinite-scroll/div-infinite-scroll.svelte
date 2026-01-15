<script lang="ts">
	import { BROWSER } from 'esm-env';
	import type { Snippet } from 'svelte';
	type PropsType = {
		triggerDistance?: number;
		children?: Snippet;
		onMore?: () => void;
	};
	let { triggerDistance = 400, children, onMore }: PropsType = $props();
	let ref: HTMLDivElement;
	let isTrigger: boolean = false;
	const calculateScroll = () => {
		if (BROWSER && ref) {
			let contentHeight = ref.scrollHeight - ref.offsetHeight;
			let scrollDistance = contentHeight - ref.scrollTop - 16;
			if (scrollDistance < triggerDistance) {
				if (!isTrigger) {
					isTrigger = true;
					if (onMore) {
						onMore();
					}
				}
			} else {
				isTrigger = false;
			}
		}
	};
	function handleScroll() {
		calculateScroll();
	}
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
