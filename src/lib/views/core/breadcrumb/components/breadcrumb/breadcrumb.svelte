<script lang="ts">
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import { mdiChevronRight, mdiHome } from '$lib/views/core/icon/index.js';

	type BreadcrumbItem = {
		label: string;
		href?: string;
		iconPath?: string;
	};

	type PropsType = {
		items: BreadcrumbItem[];
		separatorPath?: string;
		className?: string;
		showHomeIcon?: boolean;
		onClick?: (item: BreadcrumbItem, index: number) => void;
	};

	let {
		items = [],
		separatorPath = mdiChevronRight,
		className = '',
		showHomeIcon = false,
		onClick
	}: PropsType = $props();
</script>

<nav aria-label="Breadcrumb" class={className}>
	<ol class="flex flex-wrap items-center gap-1 text-sm">
		{#each items as item, index}
			{@const isLast = index === items.length - 1}
			{#if index > 0}
				<li aria-hidden="true">
					<Icon
						path={separatorPath}
						sizeClassName="w-4 h-4 text-neutral-400 dark:text-neutral-600"
					/>
				</li>
			{/if}
			<li>
				{#if isLast}
					<span
						class="font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-1"
						aria-current="page"
					>
						{#if item.iconPath || (index === 0 && showHomeIcon)}
							<Icon
								path={item.iconPath || mdiHome}
								sizeClassName="w-4 h-4"
							/>
						{/if}
						{item.label}
					</span>
				{:else if item.href}
					<a
						href={item.href}
						class="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-400 transition-colors"
						onclick={onClick ? (e) => { e.preventDefault(); onClick(item, index); } : undefined}
					>
						{#if item.iconPath || (index === 0 && showHomeIcon)}
							<Icon
								path={item.iconPath || mdiHome}
								sizeClassName="w-4 h-4"
							/>
						{/if}
						{item.label}
					</a>
				{:else}
					<button
						type="button"
						class="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer"
						onclick={() => onClick?.(item, index)}
					>
						{#if item.iconPath || (index === 0 && showHomeIcon)}
							<Icon
								path={item.iconPath || mdiHome}
								sizeClassName="w-4 h-4"
							/>
						{/if}
						{item.label}
					</button>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
