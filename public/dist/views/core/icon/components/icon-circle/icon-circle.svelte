<script lang="ts">
	import Icon from '../icon/icon.svelte';

	type Props = {
		iconPath?: string;
		iconClassName?: string;
		circleClassName?: string;
	};

	let { circleClassName, iconPath, iconClassName = 'w-5 h-5 text-primary' }: Props = $props();
</script>

<div
	class="aspect-square bg-primary-100 rounded-full w-10 h-10 flex items-center justify-center {circleClassName}"
>
	<Icon path={iconPath!} className=" text-primary {iconClassName}" />
</div>
