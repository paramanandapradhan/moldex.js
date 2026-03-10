<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimeField from './components/time-field/time-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/TimeField',
    component: TimeField,
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
      <TimeField name="time" label="Meeting Time" />
    </div>
  {/snippet}
</Story>

<Story name="Appearances">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <TimeField name="t1" label="Normal" appearance="normal" />
      <TimeField name="t2" label="Box" appearance="box" />
      <TimeField name="t3" label="Fill" appearance="fill" />
      <TimeField name="t4" label="Underline" appearance="underline" />
      <TimeField name="t5" label="Fill Underline" appearance="fill-underline" />
    </div>
  {/snippet}
</Story>
