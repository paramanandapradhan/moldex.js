<script lang="ts">
	import type { ToastPropsType } from '../../types';

	let isPlaced: boolean = $state(false);
	let isOpened: boolean = $state(false);

	let { id, msg, duration = 3000, className, children }: ToastPropsType = $props();

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
		class="fixed bottom-20 left-1/2 max-w-full -translate-x-1/2 transform rounded-full bg-white p-3 px-6 text-gray-700 shadow-xl transition-opacity duration-300 dark:bg-neutral-600 dark:text-neutral-300 dark:shadow-neutral-700 {isOpened
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
