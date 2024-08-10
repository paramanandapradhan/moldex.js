<script lang="ts">
	import Drawer from '$lib/common/components/drawer/drawer.svelte';

	let drawerRef: Drawer;

	function handleToggleDrawer() {
		drawerRef && drawerRef.toggleDrawer();
	}
</script>

<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-white">
  <body class="h-full">
  ```
-->
<div>
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->

	 <Drawer bind:this={drawerRef} >
		Hello
		</Drawer> 
	 <div class="">
		<button onclick={handleToggleDrawer}>Toggle</button>
	</div>
	<div class="text-end">
		<button onclick={handleToggleDrawer}>Toggle</button>
	</div>
</div>
