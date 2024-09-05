<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../../../../../tailwind.css';

	type PropsType = {
		backdropClassName?: string;
		children?: Snippet;
		className?: string;
		containerClassName?: string;
		drawerClassName?: string;
		floatingSnippet?: Snippet;
		id?: string;
	};

	let {
		backdropClassName = '',
		children,
		className = '',
		containerClassName = '',
		drawerClassName = '',
		floatingSnippet,
		id = ''
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
		<div class="fixed inset-0 flex">
			<div
				class="relative flex transition ease-in-out duration-300 transform {isOpened
					? 'translate-x-0'
					: '-translate-x-full'} {drawerClassName}  "
			>
				<div class="grow w-72 bg-white {className}">
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

			<button class="flex-grow cursor-auto" type="button" onclick={handelBackdropClick}></button>
		</div>
	</div>
{/if}
