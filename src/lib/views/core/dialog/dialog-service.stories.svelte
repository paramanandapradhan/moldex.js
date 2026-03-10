<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Dialog from './components/dialog/dialog.svelte';

  const { Story } = defineMeta({
    title: 'Core/DialogService',
    component: Dialog,
    tags: ['autodocs'],
  });
</script>

<script>
  import Button from '../button/components/button/button.svelte';
  import {
    openDialog,
    openConfirmDialog,
    openAlertDialog,
    openDeleteConfirmDialog,
    openPickerDialog,
    openTextFieldDialog,
    openNumberFieldDialog,
    openTextareaFieldDialog,
    openDateFieldDialog,
    openLoadingDialog,
  } from '$lib/services/dialog/dialog-service.js';

  let result = $state('');

  async function handleConfirm() {
    const res = await openConfirmDialog({ msg: 'Are you sure you want to proceed?' });
    result = res ? 'Confirmed!' : 'Cancelled';
  }

  async function handleAlert() {
    await openAlertDialog({ msg: 'Your session has been saved successfully.', title: 'Success' });
    result = 'Alert dismissed';
  }

  async function handleDelete() {
    const res = await openDeleteConfirmDialog({ msg: 'This action cannot be undone. Delete this item?' });
    result = res ? 'Deleted!' : 'Cancelled';
  }

  async function handlePicker() {
    const res = await openPickerDialog({
      title: 'Select Country',
      items: ['Australia', 'Canada', 'France', 'Germany', 'India', 'Japan', 'United Kingdom', 'United States'],
    });
    result = res ? `Selected: ${res}` : 'Cancelled';
  }

  async function handleMultiPicker() {
    const res = await openPickerDialog({
      title: 'Select Skills',
      multiple: true,
      hasCheckbox: true,
      items: [
        { _id: 'svelte', name: 'Svelte' },
        { _id: 'react', name: 'React' },
        { _id: 'vue', name: 'Vue' },
        { _id: 'ts', name: 'TypeScript' },
        { _id: 'tailwind', name: 'Tailwind CSS' },
      ],
      footerOkButtonLabel: 'Select',
    });
    result = res ? `Selected: ${JSON.stringify(res)}` : 'Cancelled';
  }

  async function handleTextField() {
    const res = await openTextFieldDialog({ title: 'Enter Name', label: 'Full Name', name: 'name', required: true });
    result = res ? `Input: ${res}` : 'Cancelled';
  }

  async function handleNumberField() {
    const res = await openNumberFieldDialog({ title: 'Enter Amount', label: 'Amount', name: 'amount' });
    result = res ? `Amount: ${res}` : 'Cancelled';
  }

  async function handleTextareaField() {
    const res = await openTextareaFieldDialog({ title: 'Write a Note', label: 'Note', name: 'note' });
    result = res ? `Note: ${res}` : 'Cancelled';
  }

  async function handleDateField() {
    const res = await openDateFieldDialog({ title: 'Select Date', label: 'Date', name: 'date' });
    result = res ? `Date: ${res}` : 'Cancelled';
  }

  async function handleLoading() {
    const dialog = await openLoadingDialog({ msg: 'Processing your request...' });
    setTimeout(() => {
      dialog.closeDialog();
      result = 'Loading complete!';
    }, 2500);
  }
</script>

<Story name="Confirm Dialog">
  {#snippet template()}
    <div class="p-8 space-y-4">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">Click to open a confirmation dialog via DialogService.</p>
      <Button appearance="primary" label="Confirm Action" onClick={handleConfirm} />
      {#if result}
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Result: <span class="text-primary">{result}</span></p>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Alert Dialog">
  {#snippet template()}
    <div class="p-8 space-y-4">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">Click to open an alert dialog via DialogService.</p>
      <Button appearance="primary" label="Show Alert" onClick={handleAlert} />
      {#if result}
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Result: <span class="text-primary">{result}</span></p>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Delete Confirm">
  {#snippet template()}
    <div class="p-8 space-y-4">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">Shows a delete confirmation with destructive styling.</p>
      <Button appearance="primary" label="Delete Item" className="!bg-red-500 hover:!bg-red-700" onClick={handleDelete} />
      {#if result}
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Result: <span class="text-primary">{result}</span></p>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Picker Dialog">
  {#snippet template()}
    <div class="p-8 space-y-4">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">Single-select picker from a list of strings.</p>
      <Button appearance="primary" label="Pick Country" onClick={handlePicker} />
      {#if result}
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Result: <span class="text-primary">{result}</span></p>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Multi-Select Picker">
  {#snippet template()}
    <div class="p-8 space-y-4">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">Multi-select picker with checkbox and object items.</p>
      <Button appearance="primary" label="Pick Skills" onClick={handleMultiPicker} />
      {#if result}
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Result: <span class="text-primary">{result}</span></p>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Text Field Dialog">
  {#snippet template()}
    <div class="p-8 space-y-4">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">Prompt dialog with a text input field.</p>
      <Button appearance="primary" label="Enter Text" onClick={handleTextField} />
      {#if result}
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Result: <span class="text-primary">{result}</span></p>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Number Field Dialog">
  {#snippet template()}
    <div class="p-8 space-y-4">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">Prompt dialog with a number input field.</p>
      <Button appearance="primary" label="Enter Number" onClick={handleNumberField} />
      {#if result}
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Result: <span class="text-primary">{result}</span></p>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Textarea Dialog">
  {#snippet template()}
    <div class="p-8 space-y-4">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">Prompt dialog with a textarea for longer input.</p>
      <Button appearance="primary" label="Write Note" onClick={handleTextareaField} />
      {#if result}
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Result: <span class="text-primary">{result}</span></p>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Date Field Dialog">
  {#snippet template()}
    <div class="p-8 space-y-4">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">Prompt dialog with a date picker input.</p>
      <Button appearance="primary" label="Select Date" onClick={handleDateField} />
      {#if result}
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Result: <span class="text-primary">{result}</span></p>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Loading Dialog">
  {#snippet template()}
    <div class="p-8 space-y-4">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">Shows a loading overlay for 2.5 seconds then auto-closes.</p>
      <Button appearance="primary" label="Show Loading" onClick={handleLoading} />
      {#if result}
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Result: <span class="text-primary">{result}</span></p>
      {/if}
    </div>
  {/snippet}
</Story>
