<script lang="ts">
	import '../../../../../tailwind.css';
	import { ripple } from '$lib/actions';
	import { Icon, mdiEmailOutline } from '$lib/views/core/icon';
	 
	type PropsType = {
		input: string;
		buttonClassName?: string;
		iconPath?: string;
		iconClassName?: string;
	};

	let { input, buttonClassName, iconClassName, iconPath = mdiEmailOutline }: PropsType = $props();
</script>

<span class="flex items-center">
	<span>{input || ''}</span>
	{#if input}
		<a class="ms-1 p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100  {buttonClassName}" href="mailto:{input}" use:ripple>
			<Icon path={iconPath} className="w-4 h-4 {iconClassName}" />
		</a>
	{/if}
</span>
