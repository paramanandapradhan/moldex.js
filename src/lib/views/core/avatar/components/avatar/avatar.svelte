<script lang="ts">
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import { mdiAccount } from '$lib/views/core/icon/index.js';

	type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	type AvatarShape = 'circle' | 'square' | 'rounded';

	type PropsType = {
		src?: string;
		alt?: string;
		initials?: string;
		size?: AvatarSize;
		shape?: AvatarShape;
		className?: string;
		color?: string;
		status?: 'online' | 'offline' | 'away' | 'busy';
	};

	let {
		src = '',
		alt = '',
		initials = '',
		size = 'md',
		shape = 'circle',
		className = '',
		color = '',
		status
	}: PropsType = $props();

	const sizeMap: Record<AvatarSize, { container: string; text: string; icon: string }> = {
		xs: { container: 'w-6 h-6', text: 'text-xs', icon: 'w-4 h-4' },
		sm: { container: 'w-8 h-8', text: 'text-sm', icon: 'w-5 h-5' },
		md: { container: 'w-10 h-10', text: 'text-base', icon: 'w-6 h-6' },
		lg: { container: 'w-14 h-14', text: 'text-lg', icon: 'w-8 h-8' },
		xl: { container: 'w-20 h-20', text: 'text-2xl', icon: 'w-10 h-10' }
	};

	const shapeMap: Record<AvatarShape, string> = {
		circle: 'rounded-full',
		square: 'rounded-none',
		rounded: 'rounded-lg'
	};

	const statusColors = {
		online: 'bg-green-500',
		offline: 'bg-neutral-400',
		away: 'bg-yellow-400',
		busy: 'bg-red-500'
	};

	let s = $derived(sizeMap[size]);

	let imgError = $state(false);
	let showFallback = $derived(!src || imgError);
</script>

<span class="relative inline-flex shrink-0 {s.container} {className}">
	{#if !showFallback}
		<img
			{src}
			{alt}
			class="w-full h-full object-cover {shapeMap[shape]}"
			onerror={() => (imgError = true)}
		/>
	{:else if initials}
		<span
			class="flex w-full h-full items-center justify-center font-semibold select-none {shapeMap[shape]} {s.text} {color
				? ''
				: 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'}"
			style={color ? `background-color: ${color}` : ''}
		>
			{initials.slice(0, 2).toUpperCase()}
		</span>
	{:else}
		<span
			class="flex w-full h-full items-center justify-center {shapeMap[shape]} bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
		>
			<Icon path={mdiAccount} sizeClassName={s.icon} />
		</span>
	{/if}

	{#if status}
		<span
			class="absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-neutral-800 {statusColors[status]} {size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'}"
		></span>
	{/if}
</span>
