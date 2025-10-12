<script module lang="ts">
	export type CropperDialogPropsType = {
		outputAspectRatio?: number;
		outputWidth?: number;
		outputFormat?: OutputImageFormats;
		outputQuality?: number;
		outputType?: 'file' | 'base64';
		inputImageFile?: File | null;
		className?: string;
	};
</script>

<script lang="ts">
	import EasyCropperjs from '@cloudparker/easy-cropperjs-svelte';
	import type { DialogExports } from '../dialog/dialog.svelte';
	import { OutputImageFormatEnum, type OutputImageFormats } from '../../../../../services';

	let {
		outputWidth,
		outputFormat = OutputImageFormatEnum.WEBP,
		outputQuality = 0.8,
		outputType = 'file',
		inputImageFile,
		outputAspectRatio,
		className,
		setOnOkClick,
		setResult,
		closeDialog,
		setOnData,
		...props
	}: CropperDialogPropsType & DialogExports = $props();

	let easyCropperjsRef: EasyCropperjs | null = $state(null);

	setOnOkClick(async () => {
		console.log('setOnOkClick', easyCropperjsRef);
		if (easyCropperjsRef) {
			let targetOutoutImageFormat: any = outputFormat.split('/')[1] || 'webp';
			let res = await easyCropperjsRef.crop({
				outputWidth,
				outputFormat: targetOutoutImageFormat,
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
	<EasyCropperjs
		bind:this={easyCropperjsRef}
		{inputImageFile}
		onCrop={handleCropped}
		{outputAspectRatio}
	/>
</div>
