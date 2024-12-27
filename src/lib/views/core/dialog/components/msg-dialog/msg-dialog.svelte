<script lang="ts">
	import type { DialogExports } from '../dialog/dialog.svelte';

	type PropsType = {
		className?: string;
		msg?: string;
	};

	let { className, msg, setOnOkClick, setResult, closeDialog }: PropsType & DialogExports =
		$props();

	$effect(() => {
		setOnOkClick(() => {
			setResult(true);
			closeDialog();
		});
	});
</script>

<div class="p-6 text-base-800 dark:text-base-300 {className}">
	<div>{@html msg || ''}</div>
</div>
