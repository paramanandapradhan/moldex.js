<script lang="ts">
	import Spinner from '../../../spinner/components/spinner/spinner.svelte';
	import type { DialogExports } from '../../types';
 	 
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
		<div class="text-gray-400 {msgClassName}">
			{@html msg || ''}
		</div>
	</div>
</div>
