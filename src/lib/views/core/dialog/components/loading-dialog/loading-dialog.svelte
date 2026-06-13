<script lang="ts">
	import Spinner from '$lib/views/core/spinner/components/spinner/spinner.svelte';
	import type { DialogExports } from '../../types';
 	 
	type PropsType = {
		msg?: string;
		/** Render `msg` as raw HTML. Default false → escaped as plain text (XSS-safe). */
		allowHtml?: boolean;
		msgClassName?: string;
		spinnerClassName?: string;
		containerClassName?: string;
		className?: string;
	};

	let {
		msg = 'Please wait...',
		allowHtml = false,
		msgClassName,
		spinnerClassName,
		containerClassName,
		className,
		setOnOkClick,
		setResult,
		closeDialog,
		setOnData,
		...props
	}: PropsType & DialogExports = $props();

	setOnData((data: any) => {
		if (data?.msg) {
			msg = data?.msg || '';
		}
	});
</script>

<div class="p-6 {containerClassName}">
	<div class="flex items-center gap-4 {className}">
		<div>
			<Spinner className={spinnerClassName} />
		</div>
		<div class="text-neutral-500 dark:text-neutral-400 {msgClassName}">
			{#if allowHtml}{@html msg || ''}{:else}{msg || ''}{/if}
		</div>
	</div>
</div>
