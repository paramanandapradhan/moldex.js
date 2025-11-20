<script lang="ts">
	import { DialogSizeEnum, isMobileScreen } from '../../../../../services/index.js';
	import ButtonBack from '../../../button/components/button-back/button-back.svelte';
	import ButtonClose from '../../../button/components/button-close-icon/button-close-icon.svelte';
	import Button from '../../../button/components/button/button.svelte';
	import { mdiArrowLeft, mdiClose } from '../../../icon/index.js';
	import { type Component as ComponetType, type Snippet } from 'svelte';
	import type { DialogCloseButtonClickFunction, DialogExports, DialogProps } from '../../types';

	let {
		backdropClassName = '',
		bodyClassName = '',
		bodyComponent,
		cancelable = true,
		scrollable = true,
		children,
		className = '',
		component,
		containerClassName = '',
		footerClassName = '',
		footerCloseButtonClassName = '',
		footerCloseButtonLabel = 'Close',
		footerOkButtonClassName = '',
		footerOkButtonEnabled = true,
		footerOkButtonSpinner = false,
		footerOkButtonType = 'button',
		footerOkButtonLabel = 'Save',
		hasFooter = false,
		hasFooterCloseButton = false,
		hasFooterOkButton = false,
		hasFooterShadow = false,
		hasHeader = false,
		hasHeaderOkButton = false,

		hasHeaderShadow = false,
		hasSubtitle = false,
		hasTitle = false,
		headerOkButtonClassName = '',
		headerOkButtonLabel = '',
		headerOkButtonIconPath = '',
		headerOkButtonIconClassName = '',
		headerBackButtonClassName = '',
		headerBackIconClassName = '',
		headerBackIconPath = mdiArrowLeft,
		headerClassName = '',
		headerCloseButtonClassName = '',
		headerCloseIconClassName = '',
		headerCloseIconPath = mdiClose,
		hasHeaderBack = isMobileScreen(),
		hasHeaderClose = !isMobileScreen(),
		size = isMobileScreen() ? DialogSizeEnum.FULL : DialogSizeEnum.SM,
		id = '',
		onClose,
		onCloseClick,
		onOkClick,
		onResult,
		onData,
		props = {},
		targetFormId = undefined,
		subtitle = '',
		subtitleClassName = '',
		title = '',
		titleClassName = ''
	}: DialogProps = $props();

	let dialogExports: DialogExports = {
		closeDialog,
		setResult,
		setOkSpinner,
		setOkEnabled,
		setOnCloseClick,
		setOnOkClick,
		setOnData,
		setHeaderSnippet,
		setFooterSnippet,
		setDialogTitle
	};

	let isPlaced: boolean = $state(false);
	let isOpened: boolean = $state(false);

	let headerSnippet: Snippet | null = $state(null);
	let footerSnippet: Snippet | null = $state(null);

	let CustomComponent: ComponetType | null = $derived(component);

	let BodyComponent: ComponetType | null = $derived(bodyComponent);

	let result: any;

	let xsSizeClassName = 'w-64';
	let smSizeClassName = 'w-96';
	let mdSizeClassName = 'w-1/3';
	let lgSizeClassName = 'w-1/2';
	let xlSizeClassName = 'w-7/10';
	let fullSizeClassName = 'fixed inset-0 w-screen h-screen ';

	let screenSizeClassNameMap: { [key: string]: string } = {
		xs: xsSizeClassName,
		sm: smSizeClassName,
		md: mdSizeClassName,
		lg: lgSizeClassName,
		xl: xlSizeClassName,
		full: fullSizeClassName
	};

	let customTitle: string = $state('');

	export function toggleDialog() {
		if (isOpened) {
			closeDialog();
		} else {
			openDialog();
		}
	}

	export function openDialog() {
		isPlaced = true;

		// Disable background scroll
		document.body.style.overflow = 'hidden';

		setTimeout(() => {
			isOpened = true;
		}, 0);
	}

	export function closeDialog(value?: any): Promise<any> {
		return new Promise((resolve) => {
			isOpened = false;

			// Re-enable background scroll
			document.body.style.overflow = '';

			setTimeout(() => {
				isPlaced = false;
				onClose && onClose();
				onResult && onResult(result || value);
				resolve(result);
			}, 300);
		});
	}

	export function setResult(value: any) {
		result = value;
	}

	export function setOkEnabled(value: boolean) {
		footerOkButtonEnabled = value;
	}

	export function setOkSpinner(value: boolean) {
		footerOkButtonSpinner = value;
	}

	export function setOnData(listener: (data: any) => void) {
		onData = listener;
	}

	export function setOnOkClick(
		onclick: (event: MouseEvent | TouchEvent, options: DialogExports) => void
	) {
		onOkClick = onclick;
	}

	export function setOnCloseClick(onclick: DialogCloseButtonClickFunction) {
		onCloseClick = onclick;
	}

	export function postData(data: any) {
		onData && onData(data);
	}

	export function setHeaderSnippet(snippet: Snippet) {
		headerSnippet = snippet;
	}

	export function setFooterSnippet(snippet: Snippet) {
		footerSnippet = snippet;
	}

	export function setDialogTitle(dialogTitle: string) {
		customTitle = dialogTitle;
	}

	function handleBackdropClick() {
		if (cancelable) {
			closeDialog();
		}
	}

	async function handleClose(ev: MouseEvent | TouchEvent) {
		if (onCloseClick) {
			if (await onCloseClick(ev)) {
				closeDialog();
			}
		} else {
			closeDialog();
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Esc') {
			if (cancelable) {
				event.stopPropagation();
				closeDialog();
			}
		}
	}

	function handleOkClick(event: MouseEvent | TouchEvent) {
		if (onOkClick) {
			onOkClick(event, dialogExports);
		}
	}
</script>

{#snippet dialogContent()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		tabindex="-1"
		class="relative flex transform flex-col overflow-hidden bg-neutral-50 text-left transition-all outline-none dark:bg-neutral-800 {size ==
		DialogSizeEnum.FULL
			? 'max-h-dvh max-w-dvw'
			: 'max-h-[90dvh] max-w-[90dvw]'} {screenSizeClassNameMap[size]} {isOpened
			? 'translate-y-0 opacity-100 duration-300 ease-out sm:scale-100'
			: 'translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95'} {size ==
		DialogSizeEnum.FULL
			? ''
			: 'rounded-lg shadow-xl dark:shadow-black'} {className}"
		onclick={(ev: MouseEvent) => ev.stopPropagation()}
	>
		{#if CustomComponent?.length == 2}
			<CustomComponent {...{ ...props }} {...{ ...dialogExports }} />
		{:else}
			{#if hasHeader}
				<div
					class="flex w-full cursor-default items-center gap-4 py-2 {hasHeaderShadow
						? 'border-b shadow-sm'
						: ''} {headerClassName}"
				>
					<div>
						{#if hasHeaderBack}
							<ButtonBack
								iconPath={headerBackIconPath}
								iconClassName={headerBackIconClassName}
								className={headerBackButtonClassName}
								onClick={handleClose}
							/>
						{/if}
					</div>
					<div class="flex-grow py-2">
						{#if hasTitle}
							<div class="text-xl text-neutral-800 dark:text-neutral-300 {titleClassName}">
								{@html customTitle || title || ''}
							</div>
						{/if}
						{#if hasSubtitle}
							<div class="text-sm text-gray-500 dark:text-neutral-500 {subtitleClassName}">
								{subtitle || ''}
							</div>
						{/if}
					</div>
					{#if headerSnippet}
						{@render headerSnippet()}
					{/if}
					{#if hasHeaderOkButton}
						<Button
							appearance="border"
							className=" {headerOkButtonClassName}"
							iconPath={headerOkButtonIconPath}
							iconClassName=" text-primary {headerOkButtonIconClassName}"
							onClick={handleClose}
						/>
					{/if}
					{#if hasHeaderClose}
						<ButtonClose
							className={headerCloseButtonClassName}
							iconPath={headerCloseIconPath}
							iconClassName={headerCloseIconClassName}
							onClick={handleClose}
						/>
					{/if}
				</div>
			{/if}

			<div class="flex-grow {scrollable ? 'overflow-y-auto' : ''} {bodyClassName}">
				{#if children}
					{@render children()}
				{:else if BodyComponent?.length == 2}
					<BodyComponent {...{ ...props }} {...{ ...dialogExports }} />
				{/if}
			</div>

			{#if hasFooter}
				<div
					class="flex items-center justify-end gap-4 p-4 {hasFooterShadow
						? 'border-t'
						: ''} {footerClassName}"
				>
					<div class="flex-grow"></div>
					<div>
						{#if footerSnippet}
							{@render footerSnippet()}
						{/if}
					</div>
					{#if hasFooterOkButton}
						<Button
							id="btn-ok"
							form={targetFormId}
							type={targetFormId ? 'submit' : footerOkButtonType}
							appearance="primary"
							className=" {footerOkButtonClassName}"
							label={footerOkButtonLabel}
							disabled={!footerOkButtonEnabled}
							spinner={footerOkButtonSpinner}
							spinnerClassName="text-white w-4 h-4"
							onClick={handleOkClick}
						/>
					{/if}
					{#if hasFooterCloseButton}
						<Button
							id="btn-close"
							type="button"
							appearance="neutral"
							className=" {footerCloseButtonClassName}"
							label={footerCloseButtonLabel}
							onClick={handleClose}
						/>
					{/if}
				</div>
			{/if}
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
			class="fixed inset-0 bg-gray-500/20 backdrop-blur-sm transition-opacity dark:bg-gray-900/30 {isOpened
				? 'opacity-100 duration-300 ease-out'
				: 'opacity-0 duration-200 ease-in'} {backdropClassName}"
			aria-hidden="true"
		></div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="fixed inset-0 z-20 w-screen cursor-auto"
			onclick={handleBackdropClick}
			onkeydown={handleKeyDown}
		>
			<div class="flex min-h-full items-center justify-center">
				{@render dialogContent()}
			</div>
		</div>
	</div>
{/snippet}

{#if isPlaced}
	{@render dialog()}
{/if}
