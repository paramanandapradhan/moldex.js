<script lang="ts">
	import { Spinner } from '$lib/views/core/spinner';
	import type { DialogExportsType } from '../dialog/dialog.svelte';

	type PropsType = {
		msg?: string;
		msgClassName?: string;
		spinnerClassName?: string;
		containerClassName?: string;
		className?: string;
	};

	let {
		msg = 'Please wait...',
		msgClassName,
		spinnerClassName,
		containerClassName,
		className,
		setOnOkClick,
		setResult,
		closeDialog,
		setOnData,
		...props
	}: PropsType & DialogExportsType = $props();

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
		<div class="text-gray-400 {msgClassName}">
			{@html msg || ''}
		</div>
	</div>
</div>
