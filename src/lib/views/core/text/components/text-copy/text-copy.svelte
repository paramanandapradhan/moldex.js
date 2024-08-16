<script lang="ts">
	import '../../../../../tailwind.css';
	import Button from '$lib/views/core/button/components/button/button.svelte';
	import { copyText, showToast } from '$lib/services/index.js';
	import { mdiContentCopy } from '$lib/views/core/icon';

	type PropsType = {
		input: string;
		containerClassName?: string;
		buttonClassName?: string;
		iconClassName?: string;
		iconPath?: string;
	};

	let {
		input,
		containerClassName = '',
		buttonClassName = '',
		iconClassName = '',
		iconPath = mdiContentCopy
	}: PropsType = $props();

	function handleCopy() {
		if (input) {
			copyText(input);
			showToast('Copied!');
		}
	}
</script>

<span class="flex items-center {containerClassName}">
	<span>{input || ''}</span>
	{#if input}
		<Button
			onclick={handleCopy}
			className="ms-1 p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 {buttonClassName}"
			iconClassName="w-4 h-4 {iconClassName}"
			{iconPath}
		/>
	{/if}
</span>
