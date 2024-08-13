<script lang="ts">
	import { openDialog } from '$lib/index.js';
	import { openToast } from '$lib/toast/services/toast-service.js';

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

	function handleOpenToast() {
		openToast('Success');
	}
</script>

<button type="button" onclick={handleOpenDialog}>Open Dialog</button>

<button type="button" onclick={handleOpenToast}>Open Toast</button>
