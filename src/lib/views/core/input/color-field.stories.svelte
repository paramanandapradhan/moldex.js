<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ColorField from './components/color-field/color-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/ColorField',
    component: ColorField,
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
      value: '#7f22fe',
      appearance: 'normal',
    },
  });
</script>

<Story name="Default">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <ColorField name="color" label="Brand Color" value="#7f22fe" />
    </div>
  {/snippet}
</Story>

<Story name="Preset Colors">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <ColorField name="c1" label="Primary Purple" value="#7f22fe" />
      <ColorField name="c2" label="Danger Red" value="#ef4444" />
      <ColorField name="c3" label="Success Green" value="#22c55e" />
      <ColorField name="c4" label="Warning Amber" value="#f59e0b" />
    </div>
  {/snippet}
</Story>

<Story name="Appearances">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <ColorField name="ca1" label="Normal" appearance="normal" value="#7f22fe" />
      <ColorField name="ca2" label="Box" appearance="box" value="#7f22fe" />
      <ColorField name="ca3" label="Fill" appearance="fill" value="#7f22fe" />
      <ColorField name="ca4" label="Underline" appearance="underline" value="#7f22fe" />
      <ColorField name="ca5" label="Fill Underline" appearance="fill-underline" value="#7f22fe" />
    </div>
  {/snippet}
</Story>
