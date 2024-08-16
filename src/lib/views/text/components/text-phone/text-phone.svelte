<script lang="ts">
	import { mdiPhone } from '$lib/views/icon';
	import Icon from '$lib/views/icon/components/icon/icon.svelte';

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
		<a class="ms-1 p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 {buttonClassName}" href="tel:{input}">
			<Icon path={iconPath} className="w-4 h-4 {iconClassName} " />
		</a>
	{/if}
</span>
