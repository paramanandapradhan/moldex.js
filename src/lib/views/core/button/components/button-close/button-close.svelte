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
		onlyIcon?: boolean;
		onlyLabel?: boolean;
		onClick?: (ev: MouseEvent) => void;
	};

	let {
		label = 'Close',
		iconPath = mdiClose,
		iconClassName = '',
		className = '',
		onlyWeb,
		onlyIcon,
		onlyLabel,
		onClick
	}: PropsType = $props();

	let isMobileScreen = $state(false);

	$effect(() => {
		isMobileScreen = isSmallScreen();
	});
</script>

{#snippet button()}
	<Button
		label={!onlyIcon ? label : undefined}
		iconPath={onlyIcon || !onlyLabel ? iconPath : undefined}
		className="w-12 h-12 p-3 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-50 {className}"
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
