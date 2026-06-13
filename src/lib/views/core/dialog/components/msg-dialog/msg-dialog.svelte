<script lang="ts">
	import type { DialogExports } from '../../types';

	type PropsType = {
		className?: string;
		msg?: string;
		/** Render `msg` as raw HTML. Default false → escaped as plain text (XSS-safe). */
		allowHtml?: boolean;
	};

	let { className, msg, allowHtml = false, setOnOkClick, setResult, closeDialog }: PropsType &
		DialogExports = $props();

	$effect(() => {
		setOnOkClick(() => {
			setResult(true);
			closeDialog();
		});
	});
</script>

<div class="p-6 text-neutral-800 dark:text-neutral-300 {className}">
	<div>{#if allowHtml}{@html msg || ''}{:else}{msg || ''}{/if}</div>
</div>
