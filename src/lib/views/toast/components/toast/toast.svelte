<script context="module" lang="ts">
	import type { Snippet } from 'svelte';

	export type ToastPropsType = {
		id?: string;
		msg: string;
		duration?: number;
		className?: string;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import '../../../../../tailwind.css';
	
	let isPlaced: boolean = $state(false);
	let isOpened: boolean = $state(false);

	let { id, msg, duration = 3000, className, children }: ToastPropsType = $props();

	// export function toggleDialog() {
	// 	if (isOpened) {
	// 		closeDialog();
	// 	} else {
	// 		openDialog();
	// 	}
	// }

	export function openToast() {
		isPlaced = true;
		setTimeout(() => {
			isOpened = true;
			setTimeout(() => {
				closeClose();
			}, duration);
		}, 0);
	}

	export function closeClose() {
		isOpened = false;
		setTimeout(() => {
			isPlaced = false;
		}, 300);
	}
</script>

{#if isPlaced}
	<div
		{id}
		class="fixed bottom-20 left-1/2 transform -translate-x-1/2 p-3 px-6 max-w-full text-gray-700 bg-white shadow-xl rounded-full transition-opacity duration-300 {isOpened
			? 'opacity-100'
			: 'opacity-0'} toast {className}"
	>
		{#if children}
			{@render children()}
		{:else}
			{@html msg}
		{/if}
	</div>
{/if}

<style>
	.toast {
		z-index: 1000;
	}
</style>
