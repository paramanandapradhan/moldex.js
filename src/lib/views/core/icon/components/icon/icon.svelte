<script lang="ts">
	type IconPropsType = {
		path: string;
		className?: string;
		sizeClassName?: string;
		size?: number;
		fill?: string;
		viewBox?: string;
		color?: string;
	};

	let {
		path,
		className = '',
		size = 24,
		fill = 'currentColor',
		viewBox = '',
		color,
		sizeClassName = 'w-6 h-6'
	}: IconPropsType = $props();

	$effect(() => {
		viewBox = viewBox || `0 0 ${size} ${size}`;
	});
</script>

<svg class="align-middle {sizeClassName} {className}" {viewBox} fill={color || fill}>
	<path d={path} />
</svg>
