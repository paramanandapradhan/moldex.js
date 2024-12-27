<script lang="ts">
	import { mdiEmailOutline, mdiPhone } from '$lib';
	import ButtonMenu, {
		type Menu
	} from '$lib/views/core/button/components/button-menu/button-menu.svelte';

	let menus: Menu[] = $state<Menu[]>([
		{
			title: 'Phone',
			subtitle: 'this is my subtitle',
			hasIcon: true,
			iconPath: mdiPhone
		},
		{ title: 'Email', hasIcon: true, iconPath: mdiEmailOutline }
	]);
</script>

<div class="min-h-full flex justify-center">
	<ButtonMenu
		label="Menu"
		{menus}
		onMenu={(ev, menu) => {
			console.log(menu);
		}}
		dropdownClassName="min-w-52"
		menuIconClassName="text-primary"
	/>
</div>
