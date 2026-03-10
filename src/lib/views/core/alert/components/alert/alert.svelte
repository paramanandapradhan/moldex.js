<script lang="ts">
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import type { Snippet } from 'svelte';
	import {
		mdiInformation,
		mdiCheckCircle,
		mdiAlert,
		mdiAlertCircle,
		mdiClose
	} from '$lib/views/core/icon/index.js';

	type AlertVariant = 'info' | 'success' | 'warning' | 'error';

	type PropsType = {
		variant?: AlertVariant;
		title?: string;
		message?: string;
		dismissible?: boolean;
		className?: string;
		iconPath?: string;
		children?: Snippet;
		onDismiss?: () => void;
	};

	let {
		variant = 'info',
		title = '',
		message = '',
		dismissible = false,
		className = '',
		iconPath,
		children,
		onDismiss
	}: PropsType = $props();

	let visible = $state(true);

	const variantConfig: Record<AlertVariant, { classes: string; icon: string }> = {
		info: {
			classes:
				'bg-primary-50 border-primary-200 text-primary-800 dark:bg-primary-950/30 dark:border-primary-800 dark:text-primary-300',
			icon: mdiInformation
		},
		success: {
			classes:
				'bg-green-50 border-green-200 text-green-800 dark:bg-green-950/30 dark:border-green-800 dark:text-green-300',
			icon: mdiCheckCircle
		},
		warning: {
			classes:
				'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-300',
			icon: mdiAlert
		},
		error: {
			classes:
				'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-800 dark:text-red-300',
			icon: mdiAlertCircle
		}
	};

	let config = $derived(variantConfig[variant]);
	let resolvedIcon = $derived(iconPath || config.icon);

	function dismiss() {
		visible = false;
		onDismiss?.();
	}
</script>

{#if visible}
	<div
		class="flex items-start gap-3 rounded-lg border p-4 {config.classes} {className}"
		role="alert"
	>
		<Icon path={resolvedIcon} sizeClassName="w-5 h-5 shrink-0 mt-0.5" />
		<div class="flex-grow min-w-0">
			{#if children}
				{@render children()}
			{:else}
				{#if title}
					<div class="font-semibold text-sm mb-1">{title}</div>
				{/if}
				{#if message}
					<div class="text-sm">{@html message}</div>
				{/if}
			{/if}
		</div>
		{#if dismissible}
			<button
				type="button"
				class="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
				onclick={dismiss}
				aria-label="Dismiss"
			>
				<Icon path={mdiClose} sizeClassName="w-4 h-4" />
			</button>
		{/if}
	</div>
{/if}
