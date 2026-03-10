<script lang="ts">
	import type { Snippet } from 'svelte';

	type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

	type PropsType = {
		text?: string;
		position?: TooltipPosition;
		className?: string;
		tooltipClassName?: string;
		delay?: number;
		children: Snippet;
		tooltipContent?: Snippet;
	};

	let {
		text = '',
		position = 'top',
		className = '',
		tooltipClassName = '',
		delay = 0,
		children,
		tooltipContent
	}: PropsType = $props();

	let visible = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	function show() {
		if (delay > 0) {
			timeoutId = setTimeout(() => (visible = true), delay);
		} else {
			visible = true;
		}
	}

	function hide() {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		visible = false;
	}

	const positionClass: Record<TooltipPosition, string> = {
		top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
		bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 -translate-y-1/2 mr-2',
		right: 'left-full top-1/2 -translate-y-1/2 ml-2'
	};

	const arrowClass: Record<TooltipPosition, string> = {
		top: 'top-full left-1/2 -translate-x-1/2 border-t-neutral-800 dark:border-t-neutral-200 border-x-transparent border-b-transparent border-4',
		bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-neutral-800 dark:border-b-neutral-200 border-x-transparent border-t-transparent border-4',
		left: 'left-full top-1/2 -translate-y-1/2 border-l-neutral-800 dark:border-l-neutral-200 border-y-transparent border-r-transparent border-4',
		right: 'right-full top-1/2 -translate-y-1/2 border-r-neutral-800 dark:border-r-neutral-200 border-y-transparent border-l-transparent border-4'
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	class="relative inline-flex {className}"
	onmouseenter={show}
	onmouseleave={hide}
	onfocus={show}
	onblur={hide}
>
	{@render children()}

	{#if visible && (text || tooltipContent)}
		<span
			class="pointer-events-none absolute z-50 w-max max-w-xs rounded px-2 py-1 text-xs font-medium text-white dark:text-neutral-900 bg-neutral-800 dark:bg-neutral-200 shadow-md transition-opacity duration-150 {positionClass[position]} {tooltipClassName}"
			role="tooltip"
		>
			{#if tooltipContent}
				{@render tooltipContent()}
			{:else}
				{text}
			{/if}
			<span class="absolute {arrowClass[position]}"></span>
		</span>
	{/if}
</span>
