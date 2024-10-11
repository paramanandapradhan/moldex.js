<script lang="ts">
	import { openCropperDialog,   } from '$lib';
	import { readUrlAsFile } from '$lib/services/utils/file-service';

	let file: any;

	async function handleGetText() {
		file = await readUrlAsFile('/icons/web/icon-512-maskable.png');
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
