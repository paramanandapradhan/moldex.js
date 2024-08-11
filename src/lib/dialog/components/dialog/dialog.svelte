<script lang="ts" context="module">
	export type DialogPropsType = {
		id?: string;
		cancelable?: boolean;
		className?: string;
		hasForm?: boolean;
		containerClassName?: string;
		backdropClassName?: string;
		isFullScreen?: boolean;
		hasTitle?: boolean;
		hasSubtitle?: boolean;
		title?: string;
		subtitle?: string;
		titleClassName?: string;
		subtitleClassName?: string;
		hasHeader?: boolean;
		headerClassName?: string;
		hasHeaderClose?: boolean;
		headerCloseButtonClassName?: string;
		headerCloseIconPath?: string;
		headerCloseIconClassName?: string;
		hasHeaderBack?: boolean;
		headerBackButtonClassName?: string;
		headerBackIconPath?: string;
		headerBackIconClassName?: string;
		hasFooter?: boolean;
		hasFooterCloseButton?: boolean;
		hasFooterOkButton?: boolean;
		footerClassName?: string;
		footerCloseLabel?: string;
		footerCloseButtonClassName?: string;
		footerOkLable?: string;
		footerOkButtonClassName?: string;
		footerOkButtonType?: 'button' | 'submit' | 'reset';
		footerOkButtonSpinner?: boolean;
		footerOkButtonDisabled?: boolean;
		bodyClassName?: string;
		component?: any;
		componetProps?: any;
		children?: Snippet;
		headerChildren?: Snippet;
		bodyChildren?: Snippet;
		footerChildren?: Snippet;
		onclose?: () => void;
		onresult?: (value: any) => void;
	};
</script>

<script lang="ts">
	import Button from '$lib/button/components/button/button.svelte';
	import { mdiArrowLeft, mdiClose } from '$lib/icon/services/icon-path-service.js';
	import type { Snippet } from 'svelte';

	let {
		id = '',
		cancelable = true,
		className = '',
		containerClassName = '',
		backdropClassName = '',
		hasForm = false,
		isFullScreen = false,
		hasTitle = false,
		hasSubtitle = false,
		title = '',
		subtitle = '',
		titleClassName = '',
		subtitleClassName = '',
		hasHeader = false,
		headerClassName = '',
		hasHeaderClose = false,
		headerCloseButtonClassName = '',
		headerCloseIconPath = mdiClose,
		headerCloseIconClassName = '',
		hasHeaderBack = false,
		headerBackButtonClassName = '',
		headerBackIconPath = mdiArrowLeft,
		headerBackIconClassName = '',
		hasFooter = false,
		hasFooterCloseButton = false,
		hasFooterOkButton = false,
		footerClassName = '',
		footerCloseLabel = 'Close',
		footerCloseButtonClassName = '',
		footerOkLable = 'Save',
		footerOkButtonClassName = '',
		footerOkButtonType = 'button',
		footerOkButtonSpinner = false,
		footerOkButtonDisabled = false,
		bodyClassName = '',
		component,
		componetProps = {},
		children,
		headerChildren,
		bodyChildren,
		footerChildren,
		onclose,
		onresult
	}: DialogPropsType = $props();

	let isPlaced: boolean = $state(false);
	let isOpened: boolean = $state(false);
	let result: any;
	let dialogContainerDivRef: HTMLElement;

	export function toggleDialog() {
		if (isOpened) {
			closeDialog();
		} else {
			openDialog();
		}
	}

	export function openDialog() {
		isPlaced = true;
		setTimeout(() => {
			isOpened = true;
		}, 0);
	}

	export function closeDialog() {
		isOpened = false;
		// console.log('closeDialog', isOpened);

		setTimeout(() => {
			isPlaced = false;
			setTimeout(() => {
				onclose && onclose();
				onresult && onresult(result);
				// console.log('sent result', isPlaced);
			}, 0);
		}, 300);
	}

	export function setResult(value: any) {
		result = value;
	}

	function handleBackdropClick() {
		if (cancelable) {
			closeDialog();
		}
	}

	function handleClose() {
		closeDialog();
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Esc') {
			// console.log('handleDocumentKeyDown');
			if (cancelable) {
				// console.log('canceling');
				event.stopPropagation();
				closeDialog();
			}
		}
	}
</script>

{#snippet dialogContent()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		tabindex="-1"
		class="relative flex flex-col w-96 transform overflow-hidden bg-white text-left transition-all outline-none {isOpened
			? 'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100'
			: 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'} {isFullScreen
			? 'h-full w-full'
			: 'rounded-lg shadow-xl'} {className}"
		onclick={(ev: MouseEvent) => ev.stopPropagation()}
	>
		{#if hasHeader}
			<div class="flex items-start gap-4 w-full cursor-default {headerClassName}">
				<div>
					{#if hasHeaderBack}
						<Button
							iconPath={headerBackIconPath}
							className="p-3 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-50 {headerBackButtonClassName}"
							iconClassName={headerBackIconClassName}
						/>
					{/if}
				</div>
				<div class="py-2">
					{#if hasTitle}
						<div class="text-xl {titleClassName}">{title || ''}</div>
					{/if}
					{#if hasSubtitle}
						<div class="text-sm {subtitleClassName}">{subtitle || ''}</div>
					{/if}
				</div>
				<div class="flex-grow">
					{#if headerChildren}
						{@render headerChildren()}
					{/if}
				</div>
				<div>
					{#if hasHeaderClose}
						<Button
							id="close"
							className="p-3 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-50 {headerCloseButtonClassName}"
							iconPath={headerCloseIconPath}
							iconClassName={headerCloseIconClassName}
							onclick={handleClose}
						></Button>
					{/if}
				</div>
			</div>
		{/if}

		<div class="p-4 flex-grow overflow-y-auto {bodyClassName}">
			{#if children}
				{@render children()}
			{:else if bodyChildren}
				{@render bodyChildren()}
			{:else if component}
				<svelte:component
					this={component}
					{...componetProps}
					onclose={handleClose}
					onresult={setResult}
				/>
			{/if}
		</div>
		{#if hasFooter}
			<div class="flex items-center justify-end p-4 gap-4 {footerClassName}">
				<div class="flex-grow">
					{#if footerChildren}
						{@render footerChildren()}
					{/if}
				</div>
				{#if hasFooterOkButton}
					<Button
						id="btn-ok"
						type={footerOkButtonType}
						className="p-2 px-5 rounded bg-indigo-600 hover:bg-indigo-700 text-white {footerOkButtonClassName}"
						label={footerOkLable}
						disabled={footerOkButtonDisabled}
						spinner={footerOkButtonSpinner}
					></Button>
				{/if}
				{#if hasFooterCloseButton}
					<Button
						id="btn-close"
						type="button"
						className="p-2 px-5 rounded bg-gray-100 hover:bg-gray-200 {footerCloseButtonClassName}"
						label={footerCloseLabel}
						onclick={handleClose}
					></Button>
				{/if}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet dialog()}
	<div
		{id}
		class="relative z-20 {containerClassName}"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div
			id="backdrop"
			class="fixed inset-0 bg-gray-500/20 transition-opacity {isOpened
				? 'ease-out duration-300 opacity-100'
				: 'ease-in duration-200 opacity-0'} {backdropClassName}"
			aria-hidden="true"
		></div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="fixed inset-0 z-20 w-screen cursor-auto"
			onclick={handleBackdropClick}
			onkeydown={handleKeyDown}
		>
			<div class="flex min-h-full justify-center items-center">
				{@render dialogContent()}
			</div>
		</div>
	</div>
{/snippet}

{#if isPlaced}
	{@render dialog()}
{/if}
