<script lang="ts">
	import Button from '../../../button/components/button/button.svelte';
	import {   copyToClipboard, showToast } from '../../../../../services/index.js';
	import { mdiContentCopy } from '../../../icon';

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
			copyToClipboard(input);
			showToast('Copied!');
		}
	}
</script>

<span class="flex items-center {containerClassName}">
	<span>{input || ''}</span>
	{#if input}
		<Button
			onClick={handleCopy}
			className="ms-1 p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 {buttonClassName}"
			iconClassName="w-4 h-4 {iconClassName}"
			{iconPath}
		/>
	{/if}
</span>
