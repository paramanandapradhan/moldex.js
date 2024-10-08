<script module lang="ts">
	import ButtonBack from '$lib/views/core/button/components/button-back/button-back.svelte';
	import ButtonClose from '$lib/views/core/button/components/button-close-icon/button-close-icon.svelte';

	/**
	 * Return a Promise<boolean> value, whic=h will indiacate dialog to close or not.
	 * false -> Dont close Dialog
	 * true -> Close dialog
	 */
	export type DialogCloseButtonClickType = (ev: MouseEvent | TouchEvent) => Promise<boolean>;

	export type DialogSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

	export type DialogPropsType = {
		backdropClassName?: string;
		bodyClassName?: string;
		bodyComponent?: any;
		bodySnippet?: Snippet<[dialogExports: DialogExportsType]>;
		cancelable?: boolean;
		children?: Snippet;
		className?: string;
		component?: any;
		containerClassName?: string;
		footerClassName?: string;
		footerCloseButtonClassName?: string;
		footerCloseButtonLabel?: string;
		footerOkButtonClassName?: string;
		footerOkButtonDisabled?: boolean;
		footerOkButtonSpinner?: boolean;
		footerOkButtonType?: 'button' | 'submit' | 'reset';
		footerOkButtonLable?: string;
		footerSnippet?: Snippet<[dialogExports: DialogExportsType]>;
		hasFooter?: boolean;
		hasFooterCloseButton?: boolean;
		hasFooterOkButton?: boolean;
		hasFooterShadow?: boolean;
		hasHeader?: boolean;
		hasHeaderBack?: boolean;
		hasHeaderClose?: boolean;
		hasHeaderShadow?: boolean;
		hasSubtitle?: boolean;
		hasTitle?: boolean;
		headerBackButtonClassName?: string;
		headerBackIconClassName?: string;
		headerBackIconPath?: string;
		headerClassName?: string;
		headerCloseButtonClassName?: string;
		headerCloseIconClassName?: string;
		headerCloseIconPath?: string;
		headerSnippet?: Snippet<[dialogExports: DialogExportsType]>;
		id?: string;
		onClose?: () => void;
		onCloseClick?: DialogCloseButtonClickType;
		onOkClick?: (ev: MouseEvent | TouchEvent, options: DialogExportsType) => void;
		onResult?: (value: any) => void;
		onData?: (data: any) => void;
		props?: any;
		size?: DialogSizeType;
		submitButtonFormId?: string;
		subtitle?: string;
		subtitleClassName?: string;
		title?: string;
		titleClassName?: string;
	};

	export type DialogExportsType = {
		closeDialog: () => void;
		setResult: (value: any) => void;
		setOkSpinner: (value: boolean) => void;
		setOkDisabled: (value: boolean) => void;
		setOnOkClick: (onclick: (ev: MouseEvent | TouchEvent) => void) => void;
		setOnCloseClick: (onclick: DialogCloseButtonClickType) => void;
		setOnData: (listener: (data: any) => void) => void;
	};
</script>

<script lang="ts">
	import Button from '$lib/views/core/button/components/button/button.svelte';
	import { type Component as ComponetType, type Snippet } from 'svelte';
	import '../../../../../tailwind.css';
	import { mdiArrowLeft, mdiClose } from '$lib/views/core/icon';

	let {
		backdropClassName = '',
		bodyClassName = '',
		bodyComponent,
		bodySnippet,
		cancelable = true,
		children,
		className = '',
		component,
		containerClassName = '',
		footerClassName = '',
		footerCloseButtonClassName = '',
		footerCloseButtonLabel = 'Close',
		footerOkButtonClassName = '',
		footerOkButtonDisabled = false,
		footerOkButtonSpinner = false,
		footerOkButtonType = 'button',
		footerOkButtonLable = 'Save',
		footerSnippet,
		hasFooter = false,
		hasFooterCloseButton = false,
		hasFooterOkButton = false,
		hasFooterShadow = false,
		hasHeader = false,
		hasHeaderBack = false,
		hasHeaderClose = false,
		hasHeaderShadow = false,
		hasSubtitle = false,
		hasTitle = false,
		headerBackButtonClassName = '',
		headerBackIconClassName = '',
		headerBackIconPath = mdiArrowLeft,
		headerClassName = '',
		headerCloseButtonClassName = '',
		headerCloseIconClassName = '',
		headerCloseIconPath = mdiClose,
		headerSnippet,
		id = '',
		onClose,
		onCloseClick,
		onOkClick,
		onResult,
		onData,
		props = {},
		size = 'sm',
		submitButtonFormId = undefined,
		subtitle = '',
		subtitleClassName = '',
		title = '',
		titleClassName = ''
	}: DialogPropsType = $props();

	let dialogExports: DialogExportsType = {
		closeDialog,
		setResult,
		setOkSpinner,
		setOkDisabled,
		setOnCloseClick,
		setOnOkClick,
		setOnData
	};

	let isPlaced: boolean = $state(false);
	let isOpened: boolean = $state(false);

	let CustomComponent: ComponetType | null = $state(null);

	let BodyComponent: ComponetType | null = $state(null);

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

	export function closeDialog(value?: any): Promise<any> {
		return new Promise((resolve) => {
			isOpened = false;
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

	export function setOkDisabled(value: boolean) {
		footerOkButtonDisabled = value;
	}

	export function setOkSpinner(value: boolean) {
		footerOkButtonSpinner = value;
	}

	export function setOnData(listener: (data: any) => void) {
		onData = listener;
	}

	export function setOnOkClick(
		onclick: (event: MouseEvent | TouchEvent, options: DialogExportsType) => void
	) {
		onOkClick = onclick;
	}

	export function setOnCloseClick(onclick: DialogCloseButtonClickType) {
		onCloseClick = onclick;
	}

	export function postData(data: any) {
		onData && onData(data);
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

	$effect(() => {
		BodyComponent = bodyComponent;
	});
	$effect(() => {
		CustomComponent = component;
	});
</script>

{#snippet dialogContent()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		tabindex="-1"
		class="relative flex flex-col max-h-screen transform overflow-hidden bg-base-50 dark:bg-base-800 text-left transition-all outline-none {screenSizeClassNameMap[
			size
		]} {isOpened
			? 'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100'
			: 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'} {size == 'full'
			? ''
			: 'rounded-lg shadow-xl'} {className}"
		onclick={(ev: MouseEvent) => ev.stopPropagation()}
	>
		{#if CustomComponent?.length == 2}
			<CustomComponent {...{ ...props }} {...{ ...dialogExports }} />
		{:else}
			{#if hasHeader}
				<div
					class="flex items-start gap-4 w-full cursor-default py-2 {hasHeaderShadow
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
					<div class="py-2">
						{#if hasTitle}
							<div class="text-xl text-base-800 dark:text-base-300 {titleClassName}">{title || ''}</div>
						{/if}
						{#if hasSubtitle}
							<div class="text-sm text-gray-500 dark:text-base-500 {subtitleClassName}">{subtitle || ''}</div>
						{/if}
					</div>
					<div class="flex-grow">
						{#if headerSnippet}
							{@render headerSnippet(dialogExports)}
						{/if}
					</div>
					<div>
						{#if hasHeaderClose}
							<ButtonClose
								className={headerCloseButtonClassName}
								iconPath={headerCloseIconPath}
								iconClassName={headerCloseIconClassName}
								onClick={handleClose}
							/>
						{/if}
					</div>
				</div>
			{/if}

			<div class="flex-grow overflow-y-auto {bodyClassName}">
				{#if children}
					{@render children()}
				{:else if bodySnippet}
					{@render bodySnippet(dialogExports)}
				{:else if BodyComponent?.length == 2}
					<BodyComponent {...{ ...props }} {...{ ...dialogExports }} />
				{/if}
			</div>

			{#if hasFooter}
				<div
					class="flex items-center justify-end p-4 gap-4 {hasFooterShadow
						? 'border-t'
						: ''} {footerClassName}"
				>
					<div class="flex-grow">
						{#if footerSnippet}
							{@render footerSnippet(dialogExports)}
						{/if}
					</div>
					{#if hasFooterOkButton}
						<Button
							id="btn-ok"
							form={submitButtonFormId}
							type={submitButtonFormId ? 'submit' : footerOkButtonType}
							appearance="primary"
							className=" {footerOkButtonClassName}"
							label={footerOkButtonLable}
							disabled={footerOkButtonDisabled}
							spinner={footerOkButtonSpinner}
							spinnerClassName="text-white w-4 h-4"
							onClick={handleOkClick}
						/>
					{/if}
					{#if hasFooterCloseButton}
						<Button
							id="btn-close"
							type="button"
							appearance="base"
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
			class="fixed inset-0 bg-gray-500/20 dark:bg-gray-900/30 transition-opacity {isOpened
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
