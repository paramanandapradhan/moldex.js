<script lang="ts">
	import type { DialogExportsType } from '../dialog/dialog.svelte';

	type PropsType = {
		className?: string;
		msg?: string;
	};

	let {
		className,
		msg,
		setOnOkClick,
		setResult,
		closeDialog,
	}: PropsType & DialogExportsType = $props();

	$effect(() => {
		setOnOkClick(() => {
			setResult(true);
			closeDialog();
		});
	});
</script>

<div class="p-6 {className}">
	<div>{@html msg}</div>
</div>
