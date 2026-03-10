<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Dialog from './components/dialog/dialog.svelte';
  import Button from '../button/components/button/button.svelte';

  const { Story } = defineMeta({
    title: 'Core/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    argTypes: {
      size: {
        control: { type: 'select' },
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
        description: 'Dialog width',
      },
      hasHeader: { control: 'boolean' },
      hasFooter: { control: 'boolean' },
      hasFooterOkButton: { control: 'boolean' },
      hasFooterCloseButton: { control: 'boolean' },
      cancelable: { control: 'boolean', description: 'Close on backdrop click / Escape' },
      title: { control: 'text' },
    },
  });
</script>

<script>
  let basicDialog = $state(null);
  let xsDialog = $state(null);
  let smDialog = $state(null);
  let mdDialog = $state(null);
  let lgDialog = $state(null);
  let xlDialog = $state(null);
  let fullDialog = $state(null);
  let nonCancelableDialog = $state(null);
  let scrollableDialog = $state(null);
  let customFooterDialog = $state(null);
</script>

<Story name="Basic">
  {#snippet template()}
    <div class="p-8 flex gap-3 flex-wrap">
      <Button appearance="primary" label="Open Dialog" onClick={() => basicDialog?.openDialog()} />
    </div>
    <Dialog
      bind:this={basicDialog}
      size="sm"
      hasHeader
      hasTitle
      title="Basic Dialog"
      hasFooter
      hasFooterOkButton
      hasFooterCloseButton
    >
      {#snippet children()}
        <div class="p-6 text-neutral-700 dark:text-neutral-300">
          This is a basic dialog with a header and footer. Click outside or press Escape to close.
        </div>
      {/snippet}
    </Dialog>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    <div class="flex flex-wrap gap-3 p-8">
      <Button appearance="border" label="XS" onClick={() => xsDialog?.openDialog()} />
      <Button appearance="border" label="SM" onClick={() => smDialog?.openDialog()} />
      <Button appearance="border" label="MD" onClick={() => mdDialog?.openDialog()} />
      <Button appearance="border" label="LG" onClick={() => lgDialog?.openDialog()} />
      <Button appearance="border" label="XL" onClick={() => xlDialog?.openDialog()} />
      <Button appearance="primary" label="Full Screen" onClick={() => fullDialog?.openDialog()} />
    </div>
    <Dialog bind:this={xsDialog} size="xs" hasHeader hasTitle title="XS Dialog" hasFooter hasFooterCloseButton>
      {#snippet children()}<div class="p-4 text-neutral-700 dark:text-neutral-300">Extra small dialog content.</div>{/snippet}
    </Dialog>
    <Dialog bind:this={smDialog} size="sm" hasHeader hasTitle title="SM Dialog" hasFooter hasFooterCloseButton>
      {#snippet children()}<div class="p-4 text-neutral-700 dark:text-neutral-300">Small dialog content.</div>{/snippet}
    </Dialog>
    <Dialog bind:this={mdDialog} size="md" hasHeader hasTitle title="MD Dialog" hasFooter hasFooterCloseButton>
      {#snippet children()}<div class="p-4 text-neutral-700 dark:text-neutral-300">Medium dialog content.</div>{/snippet}
    </Dialog>
    <Dialog bind:this={lgDialog} size="lg" hasHeader hasTitle title="LG Dialog" hasFooter hasFooterCloseButton>
      {#snippet children()}<div class="p-4 text-neutral-700 dark:text-neutral-300">Large dialog content.</div>{/snippet}
    </Dialog>
    <Dialog bind:this={xlDialog} size="xl" hasHeader hasTitle title="XL Dialog" hasFooter hasFooterCloseButton>
      {#snippet children()}<div class="p-4 text-neutral-700 dark:text-neutral-300">Extra large dialog content.</div>{/snippet}
    </Dialog>
    <Dialog bind:this={fullDialog} size="full" hasHeader hasTitle title="Full Screen Dialog" hasFooter hasFooterCloseButton>
      {#snippet children()}<div class="p-4 text-neutral-700 dark:text-neutral-300">Full screen dialog — takes up the entire viewport.</div>{/snippet}
    </Dialog>
  {/snippet}
</Story>

<Story name="Non-Cancelable">
  {#snippet template()}
    <div class="p-8">
      <Button appearance="primary" label="Open Non-Cancelable" onClick={() => nonCancelableDialog?.openDialog()} />
    </div>
    <Dialog
      bind:this={nonCancelableDialog}
      size="sm"
      cancelable={false}
      hasHeader
      hasTitle
      title="Action Required"
      hasFooter
      hasFooterOkButton
      footerOkButtonLabel="Acknowledge"
    >
      {#snippet children()}
        <div class="p-6 text-neutral-700 dark:text-neutral-300">
          This dialog cannot be closed by clicking outside or pressing Escape. You must click the button.
        </div>
      {/snippet}
    </Dialog>
  {/snippet}
</Story>

<Story name="With Scrollable Content">
  {#snippet template()}
    <div class="p-8">
      <Button appearance="primary" label="Open Scrollable" onClick={() => scrollableDialog?.openDialog()} />
    </div>
    <Dialog
      bind:this={scrollableDialog}
      size="sm"
      hasHeader
      hasTitle
      title="Terms & Conditions"
      hasFooter
      hasFooterOkButton
      hasFooterCloseButton
      footerOkButtonLabel="Accept"
      footerCloseButtonLabel="Decline"
    >
      {#snippet children()}
        <div class="p-6 space-y-4 text-neutral-700 dark:text-neutral-300 text-sm">
          {#each Array(12) as _, i}
            <p>Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          {/each}
        </div>
      {/snippet}
    </Dialog>
  {/snippet}
</Story>

<Story name="Custom Footer">
  {#snippet template()}
    <div class="p-8">
      <Button appearance="primary" label="Open Custom Footer" onClick={() => customFooterDialog?.openDialog()} />
    </div>
    <Dialog
      bind:this={customFooterDialog}
      size="sm"
      hasHeader
      hasTitle
      title="Custom Footer Dialog"
      hasFooter
      footerClassName="border-t border-neutral-200 dark:border-neutral-700"
    >
      {#snippet children()}
        <div class="p-6 text-neutral-700 dark:text-neutral-300">
          Dialog with a custom footer layout using snippets.
        </div>
      {/snippet}
      {#snippet footerSnippet()}
        <div class="flex items-center justify-between w-full">
          <span class="text-xs text-neutral-400">Last saved: just now</span>
          <div class="flex gap-2">
            <Button appearance="neutral" label="Cancel" onClick={() => customFooterDialog?.closeDialog()} />
            <Button appearance="primary" label="Save Changes" onClick={() => customFooterDialog?.closeDialog()} />
          </div>
        </div>
      {/snippet}
    </Dialog>
  {/snippet}
</Story>
