<script lang="ts">
	import { isSmallScreen } from '$lib/services';
	import { mdiArrowLeft, mdiChevronRight, mdiClose } from '$lib/views/core/icon';
	import Button from '../button/button.svelte';

	type PropsType = {
		id?: string;
		iconPath?: string;
		iconClassName?: string;
		className?: string;
		onlyWeb?: boolean;

		onClick?: (ev: MouseEvent) => void;
	};

	let {
		id,
		iconPath = mdiClose,
		iconClassName = '',
		className = '',
		onlyWeb,
		onClick
	}: PropsType = $props();

	let isMobileScreen = $state(false);

	$effect(() => {
		isMobileScreen = isSmallScreen();
	});
</script>

{#snippet button()}
	<Button
		{id}
		{iconPath}
		className="w-12 h-12 rounded-full text-base-500 hover:text-base-600 hover:bg-base-50 dark:hover:bg-base-900 transition-all {className}"
		{iconClassName}
		{onClick}
	/>
{/snippet}

{#if onlyWeb}
	{#if !isMobileScreen}
		{@render button()}
	{/if}
{:else}
	{@render button()}
{/if}
