<script lang="ts">
	import '../../../../../tailwind.css';
	import { mdiChevronDown, mdilChevronUp } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';

	type AccordionData = {
		title: string;
		content: string;
	};

	type PropsType = {
		items: AccordionData[];
		className?: string;
		iconClassName?: string;
	};

	let { items, className = '', iconClassName = '' }: PropsType = $props();
	let activeIndex = $state<number | null>(0);

	function toggleAccordion(index: number) {
		activeIndex = activeIndex === index ? null : index;
	}
</script>

<div id="accordion-collapse" data-accordion="collapse" class={className}>
	{#each items as item, index}
		<div class="accordion-item">
			<h2 id="accordion-collapse-heading-{index}">
				<button
					type="button"
					class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-200 hover:text-white border border-gray-200 rounded-t-sm focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-400 dark:border-gray-300 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-400 gap-3"
					data-accordion-target="#accordion-collapse-body-1"
					onclick={() => toggleAccordion(index)}
					aria-expanded={activeIndex === index}
					aria-controls="accordion-collapse-body-{index}"
				>
					<span>{item.title}</span>
					<Icon
						path={activeIndex === index ? mdiChevronDown : mdilChevronUp}
						className={'w-3 h-3 rotate-180 shrink-0 ' + iconClassName}
						viewBox="0 0 20 20"
					/>
				</button>
			</h2>
			<div
				id="accordion-collapse-body-{index}"
				class={activeIndex === index ? '' : 'hidden'}
				aria-labelledby="accordion-collapse-heading-1"
			>
				<div class="p-5 border border-b-0 border-gray-200 dark:border-gray-300 dark:bg-gray-300">
					{@html item.content}
				</div>
			</div>
		</div>
	{/each}
</div>
