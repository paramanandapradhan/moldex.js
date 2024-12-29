<script lang="ts">
	import Icon from '../icon/icon.svelte';

	type Props = {
		path?: string;
		className?: string;
		circleClassName?: string;
	};

	let { circleClassName, path, className = 'text-primary' }: Props = $props();
</script>

<div
	class="aspect-square bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center {circleClassName}"
>
	<Icon path={path!} {className} />
</div>
