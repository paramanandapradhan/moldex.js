<script lang="ts">
	import { Button, fileToDataURL, openCropperDialog, openLoadingDialog, urlToFile } from '$lib';

	let file: any;

	async function handleGetText() {
		file = await urlToFile('/icons/web/icon-512-maskable.png');
		if (file) {
			let res = await openCropperDialog({
				inputImageFile: file,
				outputWidth: 300,
				outputFormat: 'webp',
				outputQuality: 0.6,
				outputType: 'file'
			});
			console.log(res);
		}
	}
</script>

<div class="min-h-full">
	 
</div>
