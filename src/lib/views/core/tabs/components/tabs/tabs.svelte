<script lang="ts">
	import type { Snippet } from 'svelte';

	type TabItem = {
		id: string;
		label: string;
		iconPath?: string;
		disabled?: boolean;
		badge?: string | number;
	};

	type TabsVariant = 'underline' | 'pills' | 'bordered';

	type PropsType = {
		tabs: TabItem[];
		activeTab?: string;
		variant?: TabsVariant;
		className?: string;
		tabsClassName?: string;
		contentClassName?: string;
		children?: Snippet<[{ activeTab: string }]>;
		onChange?: (tabId: string) => void;
	};

	let {
		tabs = [],
		activeTab = $bindable(''),
		variant = 'underline',
		className = '',
		tabsClassName = '',
		contentClassName = '',
		children,
		onChange
	}: PropsType = $props();

	// Set default active tab if not provided
	$effect(() => {
		if (!activeTab && tabs.length > 0) {
			activeTab = tabs[0].id;
		}
	});

	function selectTab(tab: TabItem) {
		if (tab.disabled) return;
		activeTab = tab.id;
		onChange?.(tab.id);
	}

	const wrapperVariant: Record<TabsVariant, string> = {
		underline: 'border-b border-neutral-200 dark:border-neutral-700',
		pills: 'gap-1',
		bordered: 'border border-neutral-200 dark:border-neutral-700 rounded-lg p-1 bg-neutral-50 dark:bg-neutral-900'
	};

	function tabClass(tab: TabItem): string {
		const isActive = activeTab === tab.id;
		const base = 'relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500';
		const disabledClass = tab.disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

		switch (variant) {
			case 'underline':
				return `${base} ${disabledClass} ${isActive
					? 'text-primary border-b-2 border-primary -mb-px'
					: 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 border-b-2 border-transparent -mb-px'}`;
			case 'pills':
				return `${base} rounded-lg ${disabledClass} ${isActive
					? 'bg-primary text-white'
					: 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`;
			case 'bordered':
				return `${base} rounded-md ${disabledClass} ${isActive
					? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm'
					: 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'}`;
		}
	}
</script>

<div class="w-full {className}">
	<div class="flex {wrapperVariant[variant]} {tabsClassName}" role="tablist">
		{#each tabs as tab}
			<button
				type="button"
				role="tab"
				aria-selected={activeTab === tab.id}
				aria-disabled={tab.disabled}
				id="tab-{tab.id}"
				class={tabClass(tab)}
				onclick={() => selectTab(tab)}
			>
				{tab.label}
				{#if tab.badge !== undefined}
					<span
						class="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-xs rounded-full {activeTab === tab.id
							? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
							: 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'}"
					>
						{tab.badge}
					</span>
				{/if}
			</button>
		{/each}
	</div>

	<div class="mt-4 {contentClassName}" role="tabpanel">
		{#if children}
			{@render children({ activeTab })}
		{/if}
	</div>
</div>
