<script lang="ts">
	import type { Snippet } from 'svelte';

	type BadgeVariant = 'primary' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
	type BadgeSize = 'sm' | 'md' | 'lg';
	type BadgeStyle = 'solid' | 'soft' | 'outline';

	type PropsType = {
		variant?: BadgeVariant;
		size?: BadgeSize;
		style?: BadgeStyle;
		label?: string;
		rounded?: boolean;
		dot?: boolean;
		className?: string;
		children?: Snippet;
	};

	let {
		variant = 'primary',
		size = 'md',
		style = 'soft',
		label = '',
		rounded = false,
		dot = false,
		className = '',
		children
	}: PropsType = $props();

	const variantSolid: Record<BadgeVariant, string> = {
		primary: 'bg-primary text-white',
		neutral: 'bg-neutral-600 dark:bg-neutral-500 text-white',
		success: 'bg-green-600 text-white',
		warning: 'bg-yellow-500 text-white',
		error: 'bg-red-600 text-white',
		info: 'bg-sky-500 text-white'
	};

	const variantSoft: Record<BadgeVariant, string> = {
		primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
		neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
		success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
		warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
		error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
		info: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300'
	};

	const variantOutline: Record<BadgeVariant, string> = {
		primary: 'border border-primary-400 text-primary dark:text-primary-400',
		neutral: 'border border-neutral-400 text-neutral-600 dark:text-neutral-400',
		success: 'border border-green-400 text-green-700 dark:text-green-400',
		warning: 'border border-yellow-400 text-yellow-700 dark:text-yellow-400',
		error: 'border border-red-400 text-red-700 dark:text-red-400',
		info: 'border border-sky-400 text-sky-700 dark:text-sky-400'
	};

	const dotColors: Record<BadgeVariant, string> = {
		primary: 'bg-primary',
		neutral: 'bg-neutral-500',
		success: 'bg-green-500',
		warning: 'bg-yellow-500',
		error: 'bg-red-500',
		info: 'bg-sky-500'
	};

	const sizeClass: Record<BadgeSize, string> = {
		sm: 'px-1.5 py-0.5 text-xs',
		md: 'px-2 py-0.5 text-xs',
		lg: 'px-2.5 py-1 text-sm'
	};

	let variantClass = $derived.by(() => {
		switch (style) {
			case 'solid': return variantSolid[variant];
			case 'outline': return variantOutline[variant];
			default: return variantSoft[variant];
		}
	});
</script>

<span
	class="inline-flex items-center gap-1 font-medium {sizeClass[size]} {rounded
		? 'rounded-full'
		: 'rounded'} {variantClass} {className}"
>
	{#if dot}
		<span class="w-1.5 h-1.5 rounded-full {dotColors[variant]}"></span>
	{/if}
	{#if children}
		{@render children()}
	{:else}
		{label}
	{/if}
</span>
