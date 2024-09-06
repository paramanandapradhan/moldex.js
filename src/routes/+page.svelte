<script>
	import { openTextareaFieldDialog, openTextFieldDialog } from '$lib';

	async function handleGetText() {
		let res = await openTextareaFieldDialog({ name: 'address', label: 'Enter Address' });
		console.log(res);
	}
</script>

<div class="min-h-full">
	<button onclick={handleGetText}>Get Text</button>
</div>
