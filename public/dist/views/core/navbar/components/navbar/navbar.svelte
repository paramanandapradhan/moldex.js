 
<script lang="ts">
	import ButtonBack from '../../../button/components/button-back/button-back.svelte';
	import { Icon, mdiMenu } from '../../../icon';
	import type { NavbarProps } from '../../types';

	let {
		disabledLogo,
		backButtonClassName,
		backIconPath,
		centerContainerClassName = '',
		centerSnippet,
		children,
		className = '',
		drawerButtonClassName = '',
		hasBack = false,
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
		onBack,
		rightContainerClassName = '',
		rightSnippet,
		subtitle = '',
		subtitleClassName = '',
		title = '',
		titleClassName = ''
	}: NavbarProps = $props();
</script>

<nav
	class="sticky top-0 z-20 flex h-16 shrink-0 items-center px-2 border-b border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm {className}"
>
	{#if hasBack}
		<div class="h-full flex items-center">
			<ButtonBack
				iconPath={backIconPath}
				className="text-neutral-800 dark:text-neutral-100 {backButtonClassName}"
				onClick={onBack}
			/>
		</div>
	{/if}
	{#if hasMore && morePosition === 'left'}
		<div class="h-full">
			<button
				type="button"
				class="h-full px-2 text-neutral-800 dark:text-neutral-100 {drawerButtonClassName}"
				disabled={disabledLogo}
				onclick={onMore}
			>
				<Icon path={moreIconPath} />
			</button>
		</div>
	{/if}
	{#if hasLogo}
		<div class="h-full">
			<button
				id="btn-more"
				type="button"
				class="h-full px-2 rounded-0 text-neutral-800 dark:text-neutral-100 {logoButtonClassName}"
				disabled={!onLogo}
				onclick={onLogo}
			>
				{#if logoIconPath}
					<Icon path={logoIconPath} className="h-10 w-10 {logoIconClassName}" />
				{/if}
				{#if logoImgSrc}
					<img src={logoImgSrc} class="h-8 w-8 {logoImgClassName}" alt="logo" />
				{/if}
			</button>
		</div>
	{/if}
	{#if children}
		{@render children()}
	{:else}
		<div class="h-full flex items-center">
			<div>
				{#if hasTitle}
					<div class="font-bold px-2 text-neutral-800 dark:text-neutral-100 {titleClassName}">
						{title || ''}
					</div>
				{/if}
				{#if hasSubtitle}
					<div class="text-sm px-2 text-neutral-600 dark:text-neutral-500 {subtitleClassName}">
						{subtitle || ''}
					</div>
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
	{/if}
	{#if hasMore && morePosition === 'right'}
		<div class="h-full">
			<div class="h-full">
				<button
					id="btn-more"
					type="button"
					class="h-full px-2 text-neutral-800 dark:text-neutral-100 {drawerButtonClassName}"
					disabled={!onMore}
					onclick={onMore}
				>
					<Icon path={moreIconPath} />
				</button>
			</div>
		</div>
	{/if}
</nav>
