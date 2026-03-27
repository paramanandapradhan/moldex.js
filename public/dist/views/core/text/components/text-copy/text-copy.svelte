<script lang="ts">
	import Button from '../../../button/components/button/button.svelte';
	import { copyToClipboard, showToast } from '../../../../../services/index.js';
	import { mdiContentCopy } from '../../../icon';

	type PropsType = {
		input: string;
		containerClassName?: string;
		buttonClassName?: string;
		iconClassName?: string;
		iconPath?: string;
		textClassName?: string;
	};

	let {
		input,
		containerClassName = '',
		buttonClassName = '',
		iconClassName = '',
		iconPath = mdiContentCopy,
		textClassName = ''
	}: PropsType = $props();

	function handleCopy() {
		if (input) {
			copyToClipboard(input);
			showToast('Copied!');
		}
	}
</script>

<span class="flex items-center {containerClassName}">
	<span class={textClassName}>{input || ''}</span>
	{#if input}
		<Button
			onClick={handleCopy}
			className="ms-1 p-1 rounded text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 {buttonClassName}"
			iconClassName="w-4 h-4 {iconClassName}"
			{iconPath}
		/>
	{/if}
</span>
