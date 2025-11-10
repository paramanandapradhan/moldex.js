<script lang="ts">
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

	let progressValue: number = $derived.by(() => {
		let v = value;
		if (value < 0) {
			v = 0;
		} else if (value >= 100) {
			v = 100;
		} else {
			v = value;
		}
		return v;
	});

</script>

<div class="progressbar-container w-full rounded-full bg-gray-200 {backgroundClassName}" style="">
	<div
		class="progressbar rounded-full bg-indigo-600 text-center text-xs text-white transition-all ease-in-out {className}"
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
