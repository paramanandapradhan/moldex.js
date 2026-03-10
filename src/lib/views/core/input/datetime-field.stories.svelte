<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DateTimeField from './components/datetime-field/datetime-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/DateTimeField',
    component: DateTimeField,
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
      <DateTimeField name="datetime" label="Appointment Date & Time" />
    </div>
  {/snippet}
</Story>

<Story name="Appearances">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <DateTimeField name="dt1" label="Normal" appearance="normal" />
      <DateTimeField name="dt2" label="Box" appearance="box" />
      <DateTimeField name="dt3" label="Fill" appearance="fill" />
      <DateTimeField name="dt4" label="Underline" appearance="underline" />
      <DateTimeField name="dt5" label="Fill Underline" appearance="fill-underline" />
    </div>
  {/snippet}
</Story>
