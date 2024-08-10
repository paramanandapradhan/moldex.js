<script lang="ts">
	import type { Snippet } from 'svelte';

	type PropsType = {
		children?: Snippet;
		id?: string;
		backdropClassName?: string;
		className?: string;
		containerClassName?: string;
		drawerContainerClassName?: string;
		drawerClassName?: string;
	};

	let {
		id = '',
		children,
		backdropClassName = '',
		className = 'bg-indigo-600 text-white',
		containerClassName = '',
		drawerContainerClassName = '',
		drawerClassName = ''
	}: PropsType = $props();

	let isPlaced: boolean = $state(false);
	let isOpened: boolean = $state(false);

	function handelBackdropClick() {
		toggleDrawer();
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
	<div {id} class="relative z-50 {containerClassName}" role="dialog" aria-modal="true">
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-gray-900/10 transition-opacity ease-linear duration-300 {isOpened
				? 'opacity-100'
				: 'opacity-0'}  {backdropClassName}"
			aria-hidden="true"
		></div>
		<!-- Drawer -->
		<div class="fixed inset-0 flex {drawerContainerClassName}">
			<div
				class="relative flex w-full max-w-xs flex-1 transition ease-in-out duration-300 transform {isOpened
					? 'translate-x-0'
					: '-translate-x-full'} {drawerClassName}"
			>
				<div class="flex grow flex-col gap-y-5 overflow-y-auto w-72 {className}">
					{#if children}
						{@render children()}
					{/if}
				</div>
			</div>
			<button class="flex-grow cursor-auto" type="button" onclick={handelBackdropClick}></button>
		</div>
	</div>
{/if}
