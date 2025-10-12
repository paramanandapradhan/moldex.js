<script lang="ts">
	import { isSmallScreen } from '../../../../../services';
	import { mdiArrowLeft } from '../../../icon';
	import Button from '../button/button.svelte';

	type PropsType = {
		id?: string;
		iconPath?: string;
		iconClassName?: string;
		className?: string;
		onlyMobile?: boolean;
		onClick?: (ev: MouseEvent) => void;
	};

	let {
		id,
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
		{id}
		appearance="none"
		size="none"
		{iconPath}
		className="w-12 h-12 rounded-full hover:bg-base-50 dark:hover:bg-base-900 {className}"
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
