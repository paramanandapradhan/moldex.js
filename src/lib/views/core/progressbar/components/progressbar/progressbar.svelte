<script lang="ts">
	import '../../../../../tailwind.css';
	import type { Snippet } from 'svelte';

	type PropsType = {
		className?: string;
		backgroundClassName?: string;
		value?: number;
		showValue?: boolean;
		children?: Snippet;
	};

	let {
		backgroundClassName = '',
		className = 'h-4',
		value = 0,
		showValue = false,
		children
	}: PropsType = $props();

	let progressValue: number = $state(0);

	$effect(() => {
		if (!className) {
			className = 'h-4';
		}
	});

	$effect(() => {
		if (value < 0) {
			progressValue = 0;
		} else if (value >= 100) {
			progressValue = 100;
		} else {
			progressValue = value;
		}
	});
</script>

<div class="w-full bg-gray-200 rounded-full progressbar-container {backgroundClassName}" style="">
	<div
		class="bg-indigo-600 rounded-full transition-all ease-in-out text-center text-xs text-white progressbar {className}"
		style="--progressWidth:{progressValue}%;"
	>
		{#if children}
			{@render children()}
		{:else if showValue && progressValue > 0 && progressValue <= 100}
			{progressValue}%
		{/if}
	</div>
</div>

<style>
	.progressbar-container {
		height: var(--progressHeight);
	}

	.progressbar {
		width: var(--progressWidth);
	}
</style>
