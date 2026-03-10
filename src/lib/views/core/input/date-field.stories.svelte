<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DateField from './components/date-field/date-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/DateField',
    component: DateField,
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
    },
    args: {
      appearance: 'normal',
    },
  });
</script>

<Story name="Default">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <DateField name="date" label="Date of Birth" />
    </div>
  {/snippet}
</Story>

<Story name="Appearances">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <DateField name="d1" label="Normal" appearance="normal" />
      <DateField name="d2" label="Box" appearance="box" />
      <DateField name="d3" label="Fill" appearance="fill" />
      <DateField name="d4" label="Underline" appearance="underline" />
      <DateField name="d5" label="Fill Underline" appearance="fill-underline" />
    </div>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <DateField name="dxs" label="XS" size="xs" />
      <DateField name="dsm" label="SM" size="sm" />
      <DateField name="dmd" label="MD" size="md" />
      <DateField name="dlg" label="LG" size="lg" />
    </div>
  {/snippet}
</Story>
