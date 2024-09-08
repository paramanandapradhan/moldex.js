<script lang="ts">
	import type { Snippet } from 'svelte';

	type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	type PropsType = {
		children?: Snippet;
		className?: string;
		id?: string;
		responsiveBreakpoint?: BreakpointType;
		position?: 'left' | 'right';
	};
	let {
		children,
		className,
		id,
		responsiveBreakpoint = 'md',
		position = 'left'
	}: PropsType = $props();

	let responsiveClassName = $derived.by(() => {
		switch (responsiveBreakpoint) {
			case 'xs':
				return 'xs:fixed xs:inset-y-0 xs:flex xs:w-72 xs:flex-col';
			case 'sm':
				return 'sm:fixed sm:inset-y-0 sm:flex sm:w-72 sm:flex-col';
			case 'md':
				return 'md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col';
			case 'lg':
				return 'lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col';
			case 'xl':
				return 'xl:fixed xl:inset-y-0 xl:flex xl:w-72 xl:flex-col';
			case '2xl':
				return '2xl:fixed 2xl:inset-y-0 2xl:flex 2xl:w-72 2xl:flex-col';
		}
	});
</script>

<div
	{id}
	class="hidden bg-white dark:bg-base-800 text-base-800 dark:text-base-200 border-base-100 dark:border-base-700 pt-16 {responsiveClassName} {position == 'right'
		? 'right-0'
		: ''} {className}"
>
	{#if children}
		{@render children()}
	{/if}
</div>
