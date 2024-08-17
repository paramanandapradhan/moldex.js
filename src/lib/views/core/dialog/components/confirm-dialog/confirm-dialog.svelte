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
		setOkDisabled
	}: PropsType & DialogExportsType = $props();

	$effect(() => {
		setOnOkClick(() => {
			setOkDisabled(true);
			setResult(true);
			closeDialog();
		});
	});
</script>

<div class="p-6 {className}">
	<div>{@html msg}</div>
</div>
