<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TextareaField from './components/textarea-field/textarea-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/TextareaField',
    component: TextareaField,
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
      label: { control: 'text' },
      placeholder: { control: 'text' },
      disabled: { control: 'boolean' },
      required: { control: 'boolean' },
      maxlength: { control: 'number' },
    },
    args: {
      label: 'Description',
      placeholder: 'Enter description...',
      appearance: 'normal',
      size: 'md',
      disabled: false,
      required: false,
    },
  });
</script>

<Story name="Default" args={{ label: 'Description', placeholder: 'Write a description...' }} />

<Story name="With Max Length" args={{ label: 'Bio', placeholder: 'Tell us about yourself...', maxlength: 150 }} />

<Story name="Required" args={{ label: 'Notes', placeholder: 'Enter notes...', required: true }} />

<Story name="Disabled" args={{ label: 'Description', placeholder: 'Not editable...', disabled: true }} />

<Story name="All Appearances">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <TextareaField appearance="normal" label="Normal" placeholder="Type here..." />
      <TextareaField appearance="box" label="Box" placeholder="Type here..." />
      <TextareaField appearance="fill" label="Fill" placeholder="Type here..." />
      <TextareaField appearance="underline" label="Underline" placeholder="Type here..." />
      <TextareaField appearance="fill-underline" label="Fill Underline" placeholder="Type here..." />
    </div>
  {/snippet}
</Story>
