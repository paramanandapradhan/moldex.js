<script lang="ts">
	import { mdiPhone } from '../../../icon';
	import Icon from '../../../icon/components/icon/icon.svelte';

	type PropsType = {
		input: string;
		buttonClassName?: string;
		iconPath?: string;
		iconClassName?: string;
	};

	let { input, buttonClassName, iconClassName, iconPath = mdiPhone }: PropsType = $props();
</script>

<span class="flex items-center">
	<span>{input || ''}</span>
	{#if input}
		<a
			class="ms-1 p-1 rounded text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 {buttonClassName}"
			href="tel:{input}"
		>
			<Icon path={iconPath} className="w-4 h-4 {iconClassName} " />
		</a>
	{/if}
</span>
