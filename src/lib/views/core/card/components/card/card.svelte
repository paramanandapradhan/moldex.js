<script lang="ts">
	import '../../../../../tailwind.css';
	import type { Snippet } from 'svelte';
	type PropsType = {
		className?: string;
		imgClassName?: string;
		imgSrc?: string;
		children?: Snippet;
	};

	let {
		className = '',
		imgClassName = 'rounded-t-lg',
		imgSrc = '',
		children
	}: PropsType = $props();
</script>

<div
	class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 {className}"
>
	<a href="#">
		<img class={imgClassName} src={imgSrc} alt="" />
	</a>
	<div class="p-5">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
