<script lang="ts">
	import { openDialog } from "$lib/index.js";

	function handleOpenDialog() {
		openDialog({
			// bodyChildren: dialogBody,
			hasFooter: true,
			hasFooterOkButton: true,
			hasFooterCloseButton: true,
			hasHeader: true,
			hasHeaderBack: true,
			hasHeaderClose: true
			// formId: 'form1'
		});
	}
</script>

<button type="button" onclick={handleOpenDialog}>Open</button>
