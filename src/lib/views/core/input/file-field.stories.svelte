<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FileField from './components/file-field/file-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/FileField',
    component: FileField,
    tags: ['autodocs'],
    argTypes: {
      appearance: {
        control: { type: 'select' },
        options: ['normal', 'box', 'fill', 'underline', 'fill-underline', 'none'],
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'sm', 'md', 'lg'],
      },
      multiple: { control: 'boolean' },
    },
    args: {
      appearance: 'normal',
      multiple: false,
    },
  });
</script>

<Story name="Default">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <FileField name="file" label="Upload File" placeholder="No file chosen" />
    </div>
  {/snippet}
</Story>

<Story name="Image Only">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <FileField name="image" label="Profile Photo" accepts="image/*" placeholder="Choose image..." />
    </div>
  {/snippet}
</Story>

<Story name="Multiple Files">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <FileField name="docs" label="Upload Documents" multiple placeholder="Choose files..." />
    </div>
  {/snippet}
</Story>

<Story name="Appearances">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <FileField name="f1" label="Normal" appearance="normal" placeholder="Normal..." />
      <FileField name="f2" label="Box" appearance="box" placeholder="Box..." />
      <FileField name="f3" label="Fill" appearance="fill" placeholder="Fill..." />
      <FileField name="f4" label="Underline" appearance="underline" placeholder="Underline..." />
      <FileField name="f5" label="Fill Underline" appearance="fill-underline" placeholder="Fill Underline..." />
    </div>
  {/snippet}
</Story>
