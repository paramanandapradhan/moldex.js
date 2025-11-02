<script lang="ts">
	import { isSmallScreen } from '../../../../../services';
	import { mdiArrowLeft, mdiChevronRight, mdiClose } from '../../../icon';
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
		className="w-12 h-12 rounded-full text-neutral-500 hover:text-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all {className}"
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
