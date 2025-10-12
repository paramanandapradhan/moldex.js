<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		items: any[];
		itemHeight: number;
		containerHeight: number;
		itemSnippet: Snippet<[item: any, index: number]>;
		buffer?: number;
	};

	let {
		items = [],
		itemHeight,
		containerHeight,
		buffer = 2,
		itemSnippet,
		...rest
	}: Props = $props();

	let scrollTop = $state(0);

	let totalHeight = $derived.by(() => items.length * itemHeight);

	let visibleStart = $derived.by(() => Math.max(Math.floor(scrollTop / itemHeight) - buffer, 0));
	let visibleEnd = $derived.by(() =>
		Math.min(Math.ceil((scrollTop + containerHeight) / itemHeight) + buffer, items.length)
	);

	let paddingTop = $derived.by(() => visibleStart * itemHeight);
	let paddingBottom = $derived.by(() => (items.length - visibleEnd) * itemHeight);

	let visibleItems = $derived.by(() => items.slice(visibleStart, visibleEnd));

	function handleScroll(event: Event) {
		scrollTop = (event.currentTarget as HTMLElement).scrollTop;
	}
</script>

<div
	{...rest}
	class="virtual-list"
	style="height: {containerHeight}px; overflow-y: auto; position: relative;"
	onscroll={handleScroll}
>
	<div style="padding-top: {paddingTop}px; padding-bottom: {paddingBottom}px;">
		{#each visibleItems as item, idx (visibleStart + idx)}
			<div class="virtual-item" style="height: {itemHeight}px;">
				{@render itemSnippet?.(item, visibleStart + idx)}
			</div>
		{/each}
	</div>
</div>

<style>
	.virtual-item {
		width: 100%;
		box-sizing: border-box;
	}
</style>
