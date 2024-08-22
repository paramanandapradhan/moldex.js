<script lang="ts">
	import '../../../../../tailwind.css';

	type PropsType = {
		message?: string;
		className?: string;
		height?: string;
		containerClass?: string;
		messageClass?: string;
	};

	let {
		message = 'No data found',
		className = '',
		height = '180px',
		containerClass = '',
		messageClass = ''
	}: PropsType = $props();
</script>

<div
	class={`flex items-center justify-center ${containerClass} ${className}`}
	style="--container-height: {height}; height: var(--container-height);"
>
	<div class={`text-gray-500 ${messageClass}`}>{@html message}</div>
</div>
