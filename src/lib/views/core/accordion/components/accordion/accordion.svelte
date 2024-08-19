<script lang="ts">
	import '../../../../../tailwind.css';
	import { mdiChevronDown, mdilChevronUp } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import type { Snippet } from 'svelte';

	type PropsType = {
		className?: string;
		question?: string;
		children?: Snippet;
	};

	let {
		className = '',
		question,
		children
	}: PropsType = $props();

	let isOpen = $state(false);

	function toggleAccordion() {
		isOpen = !isOpen;
	}
</script>

<div id="accordion-collapse" data-accordion="collapse">
	<h2 id="accordion-collapse-heading-1">
		<button
			type="button"
			class="flex items-center justify-between w-full p-5 font-medium rtl:text-right {className} text-gray-200 border border-gray-200 rounded-t-sm focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
			data-accordion-target="#accordion-collapse-body-1"
			onclick={toggleAccordion}
			aria-expanded={isOpen}
			aria-controls="accordion-collapse-body-1"
		>
			<span>{question}</span>
			<Icon
				path={isOpen ? mdiChevronDown : mdilChevronUp}
				className={'w-3 h-3 rotate-180 shrink-0 '}
				viewBox="0 0 20 20"
			/>
		</button>
	</h2>
	<div
		id="accordion-collapse-body-1"
		class={isOpen ? '' : 'hidden'}
		aria-labelledby="accordion-collapse-heading-1"
	>
		<div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</div>
