<script lang="ts">
	import type { Snippet } from 'svelte';

	type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	type PropsType = {
		children?: Snippet;
		className?: string;
		id?: string;
		responsiveBreakpoint?: BreakpointType;
	};
	let { children, className, id, responsiveBreakpoint = 'md' }: PropsType = $props();

	let responsiveClassName = $derived.by(() => {
		switch (responsiveBreakpoint) {
			case 'xs':
				return 'xs:pl-72';
			case 'sm':
				return 'sm:pl-72';
			case 'md':
				return 'md:pl-72';
			case 'lg':
				return 'lg:pl-72';
			case 'xl':
				return 'xl:pl-72';
			case '2xl':
				return '2xl:pl-72';
		}
	});
</script>

<div {id} class="{responsiveClassName} {className}">
	{#if children}
		{@render children()}
	{/if}
</div>
