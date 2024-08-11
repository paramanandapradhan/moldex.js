<script lang="ts" context="module"></script>

<script lang="ts">import Button from "../../../button/components/button/button.svelte";
import { mdiArrowLeft, mdiClose } from "../../../icon/services/icon-path-service.js";
let {
  id = "",
  formId = void 0,
  cancelable = true,
  className = "",
  containerClassName = "",
  backdropClassName = "",
  hasHeaderShadow = false,
  hasTitle = false,
  hasSubtitle = false,
  title = "",
  subtitle = "",
  titleClassName = "",
  subtitleClassName = "",
  hasHeader = false,
  headerClassName = "",
  hasHeaderClose = false,
  headerCloseButtonClassName = "",
  headerCloseIconPath = mdiClose,
  headerCloseIconClassName = "",
  hasHeaderBack = false,
  headerBackButtonClassName = "",
  headerBackIconPath = mdiArrowLeft,
  headerBackIconClassName = "",
  hasFooter = false,
  hasFooterShadow = false,
  hasFooterCloseButton = false,
  hasFooterOkButton = false,
  footerClassName = "",
  footerCloseLabel = "Close",
  footerCloseButtonClassName = "",
  footerOkLable = "Save",
  footerOkButtonClassName = "",
  footerOkButtonType = "button",
  footerOkButtonSpinner = false,
  footerOkButtonDisabled = false,
  size = "sm",
  bodyClassName = "",
  component,
  componetProps = {},
  children,
  headerChildren,
  bodyChildren,
  footerChildren,
  onclose,
  onresult
} = $props();
let dialogExports = { closeDialog, setResult, setOkSpinner, setOkDisabled };
let isPlaced = $state(false);
let isOpened = $state(false);
let result;
let smSizeClassName = "w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4";
let mdSizeClassName = "w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3";
let lgSizeClassName = "w-11/12 sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-1/2";
let fullSizeClassName = "fixed inset-0 w-screen h-screen ";
let screenSizeClassNameMap = {
  sm: smSizeClassName,
  md: mdSizeClassName,
  lg: lgSizeClassName,
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
export function closeDialog() {
  return new Promise((resolve) => {
    isOpened = false;
    setTimeout(() => {
      isPlaced = false;
      onclose && onclose();
      onresult && onresult(result);
      resolve(result);
    }, 300);
  });
}
export function setResult(value) {
  result = value;
}
export function setOkDisabled(value) {
  footerOkButtonDisabled = value;
}
export function setOkSpinner(value) {
  footerOkButtonSpinner = value;
}
function handleBackdropClick() {
  if (cancelable) {
    closeDialog();
  }
}
function handleClose() {
  closeDialog();
}
function handleKeyDown(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    if (cancelable) {
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
		class="relative flex flex-col max-h-screen transform overflow-hidden bg-white text-left transition-all outline-none {screenSizeClassNameMap[
			size
		]} {isOpened
			? 'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100'
			: 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'} {size == 'full'
			? ''
			: 'rounded-lg shadow-xl'} {className}"
		onclick={(ev: MouseEvent) => ev.stopPropagation()}
	>
		{#if hasHeader}
			<div
				class="flex items-start gap-4 w-full cursor-default py-2 {hasHeaderShadow
					? 'border-b shadow-sm'
					: ''} {headerClassName}"
			>
				<div>
					{#if hasHeaderBack}
						<Button
							iconPath={headerBackIconPath}
							className="p-3 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-50 {headerBackButtonClassName}"
							iconClassName={headerBackIconClassName}
							onclick={handleClose}
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
						{@render headerChildren(dialogExports)}
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
				{@render bodyChildren(dialogExports)}
			{:else if component}
				<svelte:component this={component} ...componetProps ...dialogExports />
			{/if}
		</div>

		{#if hasFooter}
			<div
				class="flex items-center justify-end p-4 gap-4 {hasFooterShadow
					? 'border-t'
					: ''} {footerClassName}"
			>
				<div class="flex-grow">
					{#if footerChildren}
						{@render footerChildren(dialogExports)}
					{/if}
				</div>
				{#if hasFooterOkButton}
					<Button
						id="btn-ok"
						form={formId}
						type={formId ? 'submit' : footerOkButtonType}
						className="p-2 px-5 rounded bg-indigo-600 hover:bg-indigo-700 text-white {footerOkButtonClassName}"
						label={footerOkLable}
						disabled={footerOkButtonDisabled}
						spinner={footerOkButtonSpinner}
						spinnerClassName="text-white w-4 h-4"
					/>
				{/if}
				{#if hasFooterCloseButton}
					<Button
						id="btn-close"
						type="button"
						className="p-2 px-5 rounded bg-gray-100 hover:bg-gray-200 {footerCloseButtonClassName}"
						label={footerCloseLabel}
						onclick={handleClose}
					/>
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
