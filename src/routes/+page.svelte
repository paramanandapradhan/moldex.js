<script lang="ts">
	import { openConfirmDialog, openDeleteConfirmDialog } from '$lib';

	async function handleOpen() {
		let res = await openDeleteConfirmDialog();
		console.log(res);
	}
</script>

<div class="p-10">
	<button onclick={handleOpen}>Open Dialog</button>
</div>
