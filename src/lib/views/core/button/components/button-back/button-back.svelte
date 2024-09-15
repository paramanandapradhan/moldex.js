<script lang="ts">
	import { isSmallScreen } from '$lib/services';
	import { mdiArrowLeft, mdiChevronRight } from '$lib/views/core/icon';
	import Button from '../button/button.svelte';

	type PropsType = {
		iconPath?: string;
		iconClassName?: string;
		className?: string;
		onlyMobile?: boolean;
		onClick?: (ev: MouseEvent) => void;
	};

	let {
		iconPath = mdiArrowLeft,
		iconClassName = '',
		className = '',
		onlyMobile,
		onClick
	}: PropsType = $props();

	let isMobileScreen = $state(false);

	$effect(() => {
		isMobileScreen = isSmallScreen();
	});
</script>

{#snippet button()}
	<Button
		appearance="none"
		{iconPath}
		className="w-12 h-12 !p-0 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 {className}"
		{iconClassName}
		{onClick}
	/>
{/snippet}

{#if onlyMobile}
	{#if isMobileScreen}
		{@render button()}
	{/if}
{:else}
	{@render button()}
{/if}
