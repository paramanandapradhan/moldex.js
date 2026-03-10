<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import InputField from './components/input-field/input-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/InputField',
    component: InputField,
    tags: ['autodocs'],
    argTypes: {
      appearance: {
        control: { type: 'select' },
        options: ['normal', 'box', 'fill', 'underline', 'fill-underline', 'none'],
        description: 'Visual style of the input',
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'sm', 'md', 'lg'],
      },
      label: { control: 'text' },
      placeholder: { control: 'text' },
      disabled: { control: 'boolean' },
      required: { control: 'boolean' },
      floatingLabel: { control: 'boolean', description: 'Enable floating label animation' },
    },
    args: {
      label: 'Email',
      placeholder: 'Enter email...',
      appearance: 'normal',
      size: 'md',
      disabled: false,
      required: false,
      floatingLabel: false,
    },
  });
</script>

<Story name="Normal" args={{ appearance: 'normal', label: 'Label', placeholder: 'Type here...' }} />

<Story name="Box" args={{ appearance: 'box', label: 'Box Input', placeholder: 'Type here...' }} />

<Story name="Fill" args={{ appearance: 'fill', label: 'Fill Input', placeholder: 'Type here...' }} />

<Story name="Underline" args={{ appearance: 'underline', label: 'Underline', placeholder: 'Type here...' }} />

<Story name="Fill Underline" args={{ appearance: 'fill-underline', label: 'Fill Underline', placeholder: 'Type here...' }} />

<Story name="Floating Label" args={{ appearance: 'normal', label: 'Email Address', placeholder: ' ', floatingLabel: true }} />

<Story name="Required" args={{ appearance: 'normal', label: 'Required Field', placeholder: 'Required...', required: true }} />

<Story name="Disabled" args={{ appearance: 'normal', label: 'Disabled', placeholder: 'Disabled...', disabled: true }} />

<Story name="All Appearances">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <InputField appearance="normal" label="Normal" placeholder="Normal appearance" />
      <InputField appearance="box" label="Box" placeholder="Box appearance" />
      <InputField appearance="fill" label="Fill" placeholder="Fill appearance" />
      <InputField appearance="underline" label="Underline" placeholder="Underline appearance" />
      <InputField appearance="fill-underline" label="Fill Underline" placeholder="Fill underline" />
    </div>
  {/snippet}
</Story>

<Story name="All Sizes">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <InputField size="xs" label="XSmall" placeholder="XSmall" />
      <InputField size="sm" label="Small" placeholder="Small" />
      <InputField size="md" label="Medium" placeholder="Medium" />
      <InputField size="lg" label="Large" placeholder="Large" />
    </div>
  {/snippet}
</Story>
