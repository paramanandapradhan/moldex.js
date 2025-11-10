<script lang="ts">
	import { isSmallScreen } from '$lib/services/index.js';
	import { mdiClose } from '$lib/views/core/icon/index.js';

 
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

	let isMobileScreen = $state(isSmallScreen() || false);

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
