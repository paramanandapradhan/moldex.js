<script lang="ts">
	import Icon from '../icon/icon.svelte';

	type Props = {
		iconPath?: string;
		iconClassName?: string;
		circleClassName?: string;
	};

	let { circleClassName, iconPath, iconClassName = 'text-primary' }: Props = $props();
</script>

<div
	class="aspect-square bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center {circleClassName}"
>
	<Icon path={iconPath!} className={iconClassName} />
</div>
