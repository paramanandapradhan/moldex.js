<script lang="ts">
	import EasyCropperjs from '@cloudparker/easy-cropperjs-svelte';
	import { OutputImageFormatEnum } from '../../../../../services/index.js';
	import type { CropperDialogProps, DialogExports } from '../../types';

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
	}: CropperDialogProps & DialogExports = $props();

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
