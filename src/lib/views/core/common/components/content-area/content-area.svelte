<script lang="ts">
	import type { Snippet } from 'svelte';

	type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	type PropsType = {
		children?: Snippet;
		className?: string;
		id?: string;
		responsiveBreakpoint?: BreakpointType;
		sidebarPosition?: 'none' | 'left' | 'right';
	};
	let {
		children,
		className,
		id,
		responsiveBreakpoint = 'md',
		sidebarPosition = 'none'
	}: PropsType = $props();

	let responsiveClassName = $derived.by(() => {
		if (sidebarPosition === 'none') {
			return '';
		} else {
			switch (responsiveBreakpoint) {
				case 'xs':
					return sidebarPosition === 'left' ? 'xs:pl-72' : 'xs:pr-72';
				case 'sm':
					return sidebarPosition === 'left' ? 'sm:pl-72' : 'sm:pr-72';
				case 'md':
					return sidebarPosition === 'left' ? 'md:pl-72' : 'md:pr-72';
				case 'lg':
					return sidebarPosition === 'left' ? 'lg:pl-72' : 'lg:pr-72';
				case 'xl':
					return sidebarPosition === 'left' ? 'xl:pl-72' : 'xl:pr-72';
				case '2xl':
					return sidebarPosition === 'left' ? '2xl:pl-72' : '2xl:pr-72';
			}
		}
	});
</script>

<div {id} class="{responsiveClassName} {className}">
	{#if children}
		{@render children()}
	{/if}
</div>
