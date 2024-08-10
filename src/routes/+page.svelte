<script lang="ts">
	import Dialog from '$lib/dialog/components/dialog/dialog.svelte';
	import Drawer from '$lib/common/components/drawer/drawer.svelte';
	import Navbar from '$lib/common/components/navbar/navbar.svelte';
	import { mdiFlowerTulip } from '$lib/icon/services/icon-path-service.js';
	import Button from '$lib/button/components/button/button.svelte';
	import { openDialog } from '$lib/dialog/services/dialog-service.js';

	let drawerRef: Drawer;

	function handleToggleDrawer() {
		drawerRef && drawerRef.toggleDrawer();
	}

	function handleOPenDialog() {
		openDialog({ bodyChildren: dialogBody });
	}

	function openSecond() {
		openDialog({ bodyChildren: dialogBody2 });
	}
</script>

{#snippet dialogBody()}
	<div>First Dialog</div>
	<div>First Dialog</div>
	<div>First Dialog</div>
	<div>First Dialog</div>
	<div>First Dialog</div>
	<div>First Dialog</div>
	<div>First Dialog</div>
	<div>
		<button type="button" onclick={openSecond}>Open Second</button>
	</div>
{/snippet}

{#snippet dialogBody2()}
	<div>Sceond Dialog</div>
	<div>
		<button type="button" onclick={openSecond}>Open Third</button>
	</div>
{/snippet}

<div>
	<Drawer bind:this={drawerRef}>
		<div></div>
	</Drawer>

	<Navbar
		hasDrawer
		ondrawer={handleToggleDrawer}
		hasLogo
		hasTitle
		title="App Name"
		hasSubtitle
		subtitle="Dashboard"
	></Navbar>

	<button type="button" onclick={handleOPenDialog}>Open</button>
	<!-- <Dialog hasHeader hasHeaderBack hasTitle title="Dialog Title" hasHeaderClose hasFooter hasFooterOkButton hasFooterCloseButton>
		This is my content
	</Dialog> -->
</div>
