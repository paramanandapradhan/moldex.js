<script lang="ts">
	import { openDialog } from '$lib/index.js';
	import TextCopy from '$lib/text/components/text-copy/text-copy.svelte';
	import TextEmail from '$lib/text/components/text-email/text-email.svelte';
	import { showToast } from '$lib/toast/services/toast-service.js';

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
		showToast('Success');
	}
</script>

<div>
	<button type="button" onclick={handleOpenDialog}>Open Dialog</button>

	<button type="button" onclick={handleOpenToast}>Open Toast</button>
	
</div>

<div>
	<TextCopy input="Paramananda Pradhan"/>
</div>

<div>
	<TextEmail input="param@gmail.com"/>
</div>