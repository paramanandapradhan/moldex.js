<script lang="ts">
	import { isSmallScreen } from '$lib/services/index.js';
	import { goBack } from '$lib/services/navigation/navigation-service.js';
	import { mdiArrowLeft } from '$lib/views/core/icon/index.js';
	import Button from '../button/button.svelte';

	type PropsType = {
		id?: string;
		iconPath?: string;
		iconClassName?: string;
		className?: string;
		onlyMobile?: boolean;
		/**
		 * Fallback path when there is no in-app history to go back to.
		 * Defaults to '/' (the application root).
		 */
		homePath?: string;
		/**
		 * Custom click handler. When provided it overrides the default goBack behaviour.
		 */
		onClick?: (ev: MouseEvent) => void;
	};

	let {
		id,
		iconPath = mdiArrowLeft,
		iconClassName = '',
		className = '',
		onlyMobile,
		homePath = '/',
		onClick
	}: PropsType = $props();

	let isMobileScreen = $derived(isSmallScreen() || false);

	function handleClick(ev: MouseEvent) {
		if (onClick) {
			onClick(ev);
		} else {
			goBack(homePath);
		}
	}
</script>

{#snippet button()}
	<Button
		{id}
		appearance="none"
		size="none"
		{iconPath}
		className="w-12 h-12 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 {className}"
		{iconClassName}
		onClick={handleClick}
	/>
{/snippet}

{#if onlyMobile}
	{#if isMobileScreen}
		{@render button()}
	{/if}
{:else}
	{@render button()}
{/if}
