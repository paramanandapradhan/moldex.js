<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		items,
		itemHeight,
		containerHeight,
		buffer = 6,
		itemSnippet,
		...rest
	} = $props<{
		items: any[];
		itemHeight: number;
		containerHeight: number;
		itemSnippet: Snippet<[item: any, index: number]>;
		buffer?: number;
		[key: string]: any;
	}>();

	// Scroll position state
	const state = $state({ scrollTop: 0 });

	// Compute full list height
	const totalHeight = $derived(() => items.length * itemHeight);

	// Determine which items to render (with buffer)
	const viewportItems: { item: any; index: number; top: number }[] = $derived.by(() => {
		const start = Math.max(Math.floor(state.scrollTop / itemHeight) - buffer, 0);
		const end = Math.min(
			Math.ceil((state.scrollTop + containerHeight) / itemHeight) + buffer,
			items.length
		);
		return items.slice(start, end).map((item: any, idx: number) => ({
			item,
			index: start + idx,
			top: (start + idx) * itemHeight
		}));
	});

	// Update scrollTop on container scroll
	function handleScroll(e: Event) {
		state.scrollTop = (e.currentTarget as HTMLElement).scrollTop;
	}
</script>

<div {...rest} class="virtual-list" style="height: {containerHeight}px;" onscroll={handleScroll}>
	<div class="inner" style="height: {totalHeight}px;">
		{#each viewportItems as { item, index, top } (index)}
			<div class="virtual-item" style="top: {top}px; height: {itemHeight}px;">
				{@render itemSnippet?.(item, index)}
			</div>
		{/each}
	</div>
</div>

<style>
	.virtual-list {
		overflow-y: auto;
		position: relative;
		width: 100%;
	}
	.inner {
		position: relative;
		width: 100%;
	}
	.virtual-item {
		position: absolute;
		width: 100%;
		box-sizing: border-box;
	}
</style>
