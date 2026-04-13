<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NumberField from './components/number-field/number-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/NumberField',
    component: NumberField,
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
      min: { control: 'number' },
      max: { control: 'number' },
      step: { control: 'number' },
    },
    args: {
      label: 'Amount',
      placeholder: 'Enter number...',
      appearance: 'normal',
      size: 'md',
      disabled: false,
      required: false,
    },
  });
</script>

<Story name="Default" args={{ label: 'Quantity', placeholder: '0' }} />

<Story name="With Min Max" args={{ label: 'Age', placeholder: '18', min: 0, max: 120 }} />

<Story name="With Step" args={{ label: 'Price', placeholder: '0.00', step: 0.01, min: 0 }} />

<Story name="Required" args={{ label: 'Amount', placeholder: 'Enter amount', required: true }} />

<Story name="Disabled" args={{ label: 'Amount', placeholder: '100', disabled: true }} />

<Story name="All Appearances">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <NumberField appearance="normal" label="Normal" placeholder="0" />
      <NumberField appearance="box" label="Box" placeholder="0" />
      <NumberField appearance="fill" label="Fill" placeholder="0" />
      <NumberField appearance="underline" label="Underline" placeholder="0" />
      <NumberField appearance="fill-underline" label="Fill Underline" placeholder="0" />
    </div>
  {/snippet}
</Story>
