<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CheckboxField from './components/checkbox-field/checkbox-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/CheckboxField',
    component: CheckboxField,
    tags: ['autodocs'],
    argTypes: {
      label: { control: 'text' },
      desc: { control: 'text' },
      value: { control: 'boolean' },
      position: {
        control: { type: 'select' },
        options: ['left', 'right'],
      },
    },
    args: {
      label: 'Accept terms',
      value: false,
      position: 'left',
    },
  });
</script>

<Story name="Default">
  {#snippet template()}
    <CheckboxField name="accept" label="Accept terms and conditions" />
  {/snippet}
</Story>

<Story name="Checked">
  {#snippet template()}
    <CheckboxField name="checked" label="Already checked" value={true} />
  {/snippet}
</Story>

<Story name="With Description">
  {#snippet template()}
    <CheckboxField
      name="newsletter"
      label="Subscribe to newsletter"
      desc="Receive weekly product updates and tips."
    />
  {/snippet}
</Story>

<Story name="Label Right">
  {#snippet template()}
    <CheckboxField name="right" label="Label on right side" position="right" />
  {/snippet}
</Story>

<Story name="Multiple Checkboxes">
  {#snippet template()}
    <div class="space-y-3">
      <CheckboxField name="opt1" label="Option One" desc="First available option" />
      <CheckboxField name="opt2" label="Option Two" value={true} />
      <CheckboxField name="opt3" label="Option Three" desc="Third available option" />
    </div>
  {/snippet}
</Story>
