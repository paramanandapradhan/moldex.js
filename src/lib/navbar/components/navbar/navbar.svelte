<script lang="ts">
	import '../../../tailwind.css';
	import Button from '$lib/button/components/button/button.svelte';
	import Icon from '$lib/icon/components/icon/icon.svelte';
	import { mdiMenu } from '$lib/icon/services/icon-path-service.js';
	import type { Snippet } from 'svelte';

	type PropsType = {
		id?: string;
		className?: String;
		hasDrawer?: boolean;
		drawerIconPath?: string;
		drawerButtonClassName?: string;
		logoButtonClassName?: string;
		hasLogo?: boolean;
		logoIconPath?: string;
		logoIconClassName?: string;
		logoImgSrc?: string;
		logoImgClassName?: string;
		leftContainerClassName?: string;
		centerContainerClassName?: string;
		rightContainerClassName?: string;
		title?: string;
		subtitle?: string;
		titleClassName?: string;
		subtitleClassName?: string;
		hasTitle?: boolean;
		hasSubtitle?: boolean;
		children?: Snippet;
		leftChildren?: Snippet;
		centerChildren?: Snippet;
		rightChildren?: Snippet;
		ondrawer?: () => void;
		onlogo?: () => void;
	};

	let {
		id = '',
		children,
		leftChildren,
		centerChildren,
		rightChildren,
		className = '',
		drawerIconPath = mdiMenu,
		drawerButtonClassName = '',
		hasDrawer = false,
		hasLogo = false,
		logoButtonClassName = '',
		logoIconPath,
		logoIconClassName = 'text-indigo-600',
		logoImgSrc,
		logoImgClassName = '',
		leftContainerClassName = '',
		centerContainerClassName = '',
		rightContainerClassName = '',
		title = '',
		subtitle = '',
		titleClassName = '',
		subtitleClassName = '',
		hasTitle = false,
		hasSubtitle = false,
		ondrawer,
		onlogo
	}: PropsType = $props();
</script>

<div
	class="sticky top-0 z-10 flex h-16 shrink-0 items-center px-2 border-b border-gray-200 bg-white shadow-sm {className}"
>
	{#if children}
		{@render children()}
	{:else}
		{#if hasDrawer}
			<Button
				className="h-full px-2 text-gray-500 hover:text-gray-600 {drawerButtonClassName}"
				iconPath={drawerIconPath}
				disabled={!ondrawer}
				onclick={ondrawer}
			></Button>
		{/if}
		{#if hasLogo}
			<Button className="h-full px-2 {logoButtonClassName}" disabled={!onlogo} onclick={onlogo}>
				{#if logoIconPath}
					<Icon path={logoIconPath} className="h-10 w-10 {logoIconClassName}" />
				{/if}
				{#if logoImgSrc}
					<img src={logoImgSrc} class="h-8 w-8 bg-gray-50 {logoImgClassName}" alt="logo" />
				{/if}
			</Button>
		{/if}
	{/if}
	<div>
		{#if hasTitle}
			<div class="font-bold {titleClassName}">{title || ''}</div>
		{/if}
		{#if hasSubtitle}
			<div class="text-sm text-gray-400 {subtitleClassName}">{subtitle || ''}</div>
		{/if}
	</div>
	<div class={leftContainerClassName}>
		{#if leftChildren}
			{@render leftChildren()}
		{/if}
	</div>
	<div class="flex-grow flex justify-center {centerContainerClassName}">
		{#if centerChildren}
			{@render centerChildren()}
		{/if}
	</div>
	<div class={rightContainerClassName}>
		{#if rightChildren}
			{@render rightChildren()}
		{/if}
	</div>
</div>
