<script module lang="ts">
	export type CropperDialogPropsType = {
		outputAspectRatio?: number;
		outputWidth?: number;
		outputFormat?: 'png' | 'jpeg' | 'webp';
		outputQuality?: number;
		outputType?: 'file' | 'base64';
		inputImageFile?: File | null;
		className?: string;
	};
</script>

<script lang="ts">
	import EasyCropperjs from '@cloudparker/easy-cropperjs-svelte';
	import type { DialogExportsType } from '../dialog/dialog.svelte';

	let {
		outputWidth,
		outputFormat = 'webp',
		outputQuality = 0.8,
		outputType = 'file',
		inputImageFile,
		className,
		setOnOkClick,
		setResult,
		closeDialog,
		setOnData,
		...props
	}: CropperDialogPropsType & DialogExportsType = $props();

	let easyCropperjsRef: EasyCropperjs | null = $state(null);

	setOnOkClick(async () => {
		console.log('setOnOkClick', easyCropperjsRef);
		if (easyCropperjsRef) {
			let res = await easyCropperjsRef.crop({
				outputWidth,
				outputFormat,
				outputQuality,
				outputType
			});
			console.log('res', res);
		}
	});

	function handleCropped(result: any) {
		console.log('handleCropped', result);
		setResult(result);
		closeDialog();
	}
</script>

<div class="h-full w-full overflow-hidden {className}">
	<EasyCropperjs bind:this={easyCropperjsRef} {inputImageFile} onCrop={handleCropped} />
</div>
