<script lang="ts">
	import type { Snippet } from 'svelte';

	type PositionType = 'left' | 'right' | 'top' | 'bottom';

	type PropsType = {
		backdropClassName?: string;
		children?: Snippet;
		className?: string;
		containerClassName?: string;
		drawerClassName?: string;
		floatingSnippet?: Snippet;
		id?: string;
		position?: PositionType;
	};

	let {
		backdropClassName = '',
		children,
		className = '',
		containerClassName = '',
		drawerClassName = '',
		floatingSnippet,
		id = '',
		position = 'left'
	}: PropsType = $props();

	let isPlaced: boolean = $state(false);
	let isOpened: boolean = $state(false);

	function handelBackdropClick() {
		toggleDrawer();
	}

	function preventScroll(e: Event) {
		e.preventDefault();
		e.stopPropagation();
	}

	export function toggleDrawer() {
		if (!isPlaced) {
			openDrawer();
		} else {
			closeDrawer();
		}
	}

	export function openDrawer() {
		isPlaced = true;
		setTimeout(() => {
			isOpened = true;
		}, 0);
	}

	export function closeDrawer() {
		isOpened = false;
		setTimeout(() => {
			isPlaced = false;
		}, 300);
	}
</script>

{#if isPlaced}
	<div {id} class="relative z-30 {containerClassName}" role="dialog" aria-modal="true">
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-neutral-900/10 bg-neutral-50/10 transition-opacity ease-linear duration-300 {isOpened
				? 'opacity-100'
				: 'opacity-0'}  {backdropClassName}"
			aria-hidden="true"
		></div>
		<!-- Drawer -->
		<div
			class="fixed inset-0 flex
				{position === 'right' ? 'flex-row' : ''}
				{position === 'right' ? 'flex-row-reverse' : ''}
				{position === 'top' ? 'flex-col' : ''}
				{position === 'bottom' ? 'flex-col-reverse' : ''}"
		>
			<div
				class="relative flex transition ease-in-out duration-300 transform
				{position === 'right' ? 'flex-row' : ''}
				{position === 'right' ? 'flex-row-reverse' : ''}
				{position === 'top' ? 'flex-col' : ''}
				{position === 'bottom' ? 'flex-col-reverse' : ''}
				{position === 'left' ? (isOpened ? 'translate-x-0' : '-translate-x-full') : ''}
				{position === 'right' ? (isOpened ? 'translate-x-0' : 'translate-x-full') : ''}
				{position === 'top' ? (isOpened ? 'translate-y-0' : '-translate-y-full') : ''}
				{position === 'bottom' ? (isOpened ? 'translate-y-0' : 'translate-y-full') : ''}
				{drawerClassName} "
			>
				<div
					class="grow w-72 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-100 dark:border-neutral-700 {className}"
				>
					{#if children}
						{@render children()}
					{/if}
				</div>
				<div class=" ">
					{#if floatingSnippet}
						{@render floatingSnippet()}
					{/if}
				</div>
			</div>

			<button
				class="flex-grow cursor-auto"
				type="button"
				onclick={handelBackdropClick}
				onwheel={preventScroll}
				ontouchmove={preventScroll}
				aria-label="Close drawer"
				title="Close drawer"
			></button>
		</div>
	</div>
{/if}
