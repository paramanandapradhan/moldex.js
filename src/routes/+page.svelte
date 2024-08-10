<script lang="ts">
	import Dialog from '$lib/dialog/components/dialog/dialog.svelte';
	import Drawer from '$lib/common/components/drawer/drawer.svelte';
	import Navbar from '$lib/common/components/navbar/navbar.svelte';
	import { mdiFlowerTulip } from '$lib/icon/services/icon-path-service.js';

	let drawerRef: Drawer;

	function handleToggleDrawer() {
		drawerRef && drawerRef.toggleDrawer();
	}
</script>

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
	<Dialog hasHeader hasHeaderBack hasTitle title="Dialog Title" hasHeaderClose hasFooter hasFooterOkButton hasFooterCloseButton>
		This is my content
	</Dialog>
</div>
