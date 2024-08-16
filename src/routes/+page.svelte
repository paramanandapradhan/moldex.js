<script lang="ts">
	import { openDialog } from '$lib';
	import DialogTest from './_views/dialog-test.svelte';

	function handleOpen() {
		openDialog({
			hasHeader: true,
			hasHeaderBack: true,
			hasHeaderClose: true,
			hasFooter: true,
			hasFooterOkButton: true,
			hasFooterCloseButton: true,
			hasTitle: true,
			hasSubtitle: true,
			title: 'Dialog',
			subtitle: 'test subtitle here',
			component: DialogTest,
			props: {
				name: 'param'
			}
		});
	}
</script>

<div class="p-10">
	<button onclick={handleOpen}>Open Dialog</button>
</div>
