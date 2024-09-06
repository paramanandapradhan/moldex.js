<script lang="ts">
	import { fileToDataURL, openCropperDialog, openLoadingDialog, urlToFile } from '$lib';

	let file: any;

	async function handleGetText() {
		 file = await urlToFile('/icons/web/icon-512-maskable.png');
		 if(file){
			let res = await openCropperDialog({file, blob:true});
			console.log(res);
		 }
	}
</script>

<div class="min-h-full">
	<button onclick={handleGetText}>Get Text</button>
</div>
