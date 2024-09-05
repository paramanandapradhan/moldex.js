<script lang="ts">
	import '../../../../../tailwind.css';
	import Button from '$lib/views/core/button/components/button/button.svelte';
	import type { Snippet } from 'svelte';
	import { Icon, mdiMenu } from '$lib/views/core/icon';

	type PropsType = {
		centerContainerClassName?: string;
		centerSnippet?: Snippet;
		children?: Snippet;
		className?: String;
		drawerButtonClassName?: string;
		hasLogo?: boolean;
		hasMore?: boolean;
		hasSubtitle?: boolean;
		hasTitle?: boolean;
		id?: string;
		leftContainerClassName?: string;
		leftSnippet?: Snippet;
		logoButtonClassName?: string;
		logoIconClassName?: string;
		logoIconPath?: string;
		logoImgClassName?: string;
		logoImgSrc?: string;
		moreIconPath?: string;
		morePosition?: 'left' | 'right';
		onLogo?: () => void;
		onMore?: () => void;
		rightContainerClassName?: string;
		rightSnippet?: Snippet;
		subtitle?: string;
		subtitleClassName?: string;
		title?: string;
		titleClassName?: string;
	};

	let {
		centerContainerClassName = '',
		centerSnippet,
		children,
		className = '',
		drawerButtonClassName = '',
		hasLogo = false,
		hasMore = false,
		hasSubtitle = false,
		hasTitle = false,
		id = '',
		leftContainerClassName = '',
		leftSnippet,
		logoButtonClassName = '',
		logoIconClassName = 'text-indigo-600',
		logoIconPath,
		logoImgClassName = '',
		logoImgSrc,
		moreIconPath = mdiMenu,
		morePosition = 'left',
		onLogo,
		onMore,
		rightContainerClassName = '',
		rightSnippet,
		subtitle = '',
		subtitleClassName = '',
		title = '',
		titleClassName = ''
	}: PropsType = $props();
</script>

<nav
	class="sticky top-0 z-10 flex h-16 shrink-0 items-center px-2 border-b border-gray-200 bg-white shadow-sm {className}"
>
	{#if children}
		{@render children()}
	{:else}
		{#if hasMore && morePosition === 'left'}
			<div class="h-full">
				<Button
					className="h-full px-2 text-gray-500 hover:text-gray-600 {drawerButtonClassName}"
					iconPath={moreIconPath}
					disabled={!onMore}
					onClick={onMore}
				/>
			</div>
		{/if}
		{#if hasLogo}
			<div class="h-full">
				<Button className="h-full px-2 {logoButtonClassName}" disabled={!onLogo} onClick={onLogo}>
					{#if logoIconPath}
						<Icon path={logoIconPath} className="h-10 w-10 {logoIconClassName}" />
					{/if}
					{#if logoImgSrc}
						<img src={logoImgSrc} class="h-8 w-8 bg-gray-50 {logoImgClassName}" alt="logo" />
					{/if}
				</Button>
			</div>
		{/if}
		<div class="h-full flex items-center">
			<div>
				{#if hasTitle}
					<div class="font-bold px-2 {titleClassName}">{title || ''}</div>
				{/if}
				{#if hasSubtitle}
					<div class="text-sm px-2 text-gray-400 {subtitleClassName}">{subtitle || ''}</div>
				{/if}
			</div>
		</div>
		<div class="h-full {leftContainerClassName}">
			{#if leftSnippet}
				{@render leftSnippet()}
			{/if}
		</div>
		<div class="flex-grow flex items-center justify-center h-full {centerContainerClassName}">
			{#if centerSnippet}
				{@render centerSnippet()}
			{/if}
		</div>
		<div class="h-full {rightContainerClassName}">
			{#if rightSnippet}
				{@render rightSnippet()}
			{/if}
		</div>
		{#if hasMore && morePosition === 'right'}
			<div class="h-full">
				<Button
					className="h-full px-2 text-gray-500 hover:text-gray-600 {drawerButtonClassName}"
					iconPath={moreIconPath}
					disabled={!onMore}
					onClick={onMore}
				/>
			</div>
		{/if}
	{/if}
</nav>
