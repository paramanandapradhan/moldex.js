<script lang="ts">
	import { isSmallScreen } from '$lib/services';
	import { mdiArrowLeft, mdiChevronRight, mdiClose } from '$lib/views/core/icon';
	import Button from '../button/button.svelte';

	type PropsType = {
		label?: string;
		iconPath?: string;
		iconClassName?: string;
		className?: string;
		onlyWeb?: boolean;

		onClick?: (ev: MouseEvent) => void;
	};

	let {
		label = 'Close',
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
		{iconPath}
		className="w-12 h-12 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-50 {className}"
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
