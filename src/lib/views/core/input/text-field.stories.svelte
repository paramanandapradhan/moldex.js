<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TextField from './components/text-field/text-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/TextField',
    component: TextField,
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
      label: 'Name',
      placeholder: 'Enter name...',
      appearance: 'normal',
      size: 'md',
      disabled: false,
      required: false,
    },
  });
</script>

<Story name="Default" args={{ label: 'Name', placeholder: 'John Doe' }} />

<Story name="With Max Length" args={{ label: 'Username', placeholder: 'Enter username', maxlength: 30 }} />

<Story name="Required" args={{ label: 'Full Name', placeholder: 'Enter your full name', required: true }} />

<Story name="Disabled" args={{ label: 'Name', placeholder: 'Not editable', disabled: true }} />

<Story name="All Sizes">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <TextField size="xs" label="XSmall" placeholder="XSmall" />
      <TextField size="sm" label="Small" placeholder="Small" />
      <TextField size="md" label="Medium" placeholder="Medium" />
      <TextField size="lg" label="Large" placeholder="Large" />
    </div>
  {/snippet}
</Story>

<Story name="All Appearances">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <TextField appearance="normal" label="Normal" placeholder="Normal appearance" />
      <TextField appearance="box" label="Box" placeholder="Box appearance" />
      <TextField appearance="fill" label="Fill" placeholder="Fill appearance" />
      <TextField appearance="underline" label="Underline" placeholder="Underline appearance" />
      <TextField appearance="fill-underline" label="Fill Underline" placeholder="Fill underline" />
    </div>
  {/snippet}
</Story>
