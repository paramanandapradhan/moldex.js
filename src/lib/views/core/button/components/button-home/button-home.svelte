<script lang="ts">
	import { goHome } from '$lib/services/navigation/navigation-service.js';
	import { mdiHome } from '$lib/views/core/icon/index.js';
	import Button from '../button/button.svelte';

	type PropsType = {
		id?: string;
		iconPath?: string;
		iconClassName?: string;
		className?: string;
		/** The path to navigate to. Defaults to '/'. */
		homePath?: string;
		onClick?: (ev: MouseEvent) => void;
	};

	let {
		id,
		iconPath = mdiHome,
		iconClassName = '',
		className = '',
		homePath = '/',
		onClick
	}: PropsType = $props();

	function handleClick(ev: MouseEvent) {
		if (onClick) {
			onClick(ev);
		} else {
			goHome(homePath);
		}
	}
</script>

<Button
	{id}
	appearance="none"
	size="none"
	{iconPath}
	className="w-12 h-12 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 {className}"
	{iconClassName}
	onClick={handleClick}
/>
