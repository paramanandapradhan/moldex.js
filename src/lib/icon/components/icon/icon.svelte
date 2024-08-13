<script lang="ts">
	import '../../../tailwind.css';
	type IconPropsType = {
		path: string;
		className?: string;
		size?: number;
		fill?: string;
		viewBox?: string;
	};

	let {
		path,
		className = 'w-6 h-6',
		size = 24,
		fill = 'currentColor',
		viewBox = ''
	}: IconPropsType = $props();

	$effect(() => {
		viewBox = viewBox || `0 0 ${size} ${size}`;
	});
</script>

<svg class=" align-middle {className}" {viewBox} fill="currentColor">
	<path d={path} />
</svg>
