<script module lang="ts">
	export type CropperDialogPropsType = {
		width?: number;
		height?: number;
		format?: 'png' | 'jpeg' | 'webp';
		quality?: number;
		blob?: boolean;
		file?: File | null;
		className?: string;
	};
</script>

<script lang="ts">
	import EasyCropperjs from '@cloudparker/easy-cropperjs-svelte';
	import type { DialogExportsType } from '../dialog/dialog.svelte';

	let {
		width,
		height,
		format = 'webp',
		quality = 0.8,
		blob,
		file,
		className,
		setOnOkClick,
		setResult,
		closeDialog,
		setOnData,
		...props
	}: CropperDialogPropsType & DialogExportsType = $props();

	let easyCropperjsRef: EasyCropperjs | null = $state(null);

	setOnOkClick(() => {
		console.log('OK Clicked');
		if (easyCropperjsRef) {
			easyCropperjsRef.crop({ width, height, format, quality, blob });
		}
	});

	function handleCropped(result: any) {
		setResult(result);
		closeDialog();
	}
</script>

<div class="h-full w-full overflow-hidden {className}">
	<EasyCropperjs bind:this={easyCropperjsRef} {file} onCrop={handleCropped} />
</div>
