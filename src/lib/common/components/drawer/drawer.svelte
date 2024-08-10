<script lang="ts">
	import type { Snippet } from 'svelte';

	type PropsType = {
		children?: Snippet;
		id?: string;
		backdropClassName?: string;
		className?: string;
		containerClassName?: string;
	};

	let {
		id = '',
		children,
		backdropClassName = '',
		className = 'bg-gray-300',
		containerClassName = ''
	}: PropsType = $props();

	let hasDrawer: boolean = $state(false);
	let isOpened: boolean = $state(false);

	function handelBackdropClick() {
		toggleDrawer();
	}

	export function toggleDrawer() {
		if (!hasDrawer) {
			hasDrawer = true;
			setTimeout(() => {
				isOpened = true;
			}, 0);
		} else {
			isOpened = false;
			setTimeout(() => {
				hasDrawer = false;
			}, 300);
		}
	}
</script>

{#if hasDrawer}
	<div {id} class="relative {containerClassName}" role="dialog" aria-modal="true">
		<div
			class="fixed inset-0 bg-gray-900/10 transition-opacity ease-linear duration-300 {isOpened
				? 'opacity-100'
				: 'opacity-0'}  {backdropClassName}"
			aria-hidden="true"
		></div>
		<div class="fixed inset-0 flex">
			<div
				class="relative w-72 transition ease-in-out duration-300 transform {isOpened
					? 'translate-x-0'
					: '-translate-x-full'} {className}"
			>
				<div>
					{#if children}
						{@render children()}
					{/if}
				</div>
			</div>
			<button class="flex-grow cursor-auto" type="button" onclick={handelBackdropClick}></button>
		</div>
	</div>
{/if}
