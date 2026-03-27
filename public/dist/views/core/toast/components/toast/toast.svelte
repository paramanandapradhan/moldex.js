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
				closeToast();
			}, duration);
		}, 0);
	}

	export function closeToast() {
		isOpened = false;
		setTimeout(() => {
			isPlaced = false;
		}, 300);
	}

	/** @deprecated use closeToast() */
	export function closeClose() {
		closeToast();
	}
</script>

{#if isPlaced}
	<div
		{id}
		class="fixed bottom-20 left-1/2 max-w-full -translate-x-1/2 transform rounded-full bg-neutral-800 dark:bg-neutral-700 p-3 px-6 text-neutral-100 shadow-xl dark:shadow-neutral-900 transition-opacity duration-300 {isOpened
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
