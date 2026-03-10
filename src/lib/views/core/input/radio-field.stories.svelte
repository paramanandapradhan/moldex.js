<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import RadioField from './components/radio-field/radio-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/RadioField',
    component: RadioField,
    tags: ['autodocs'],
    argTypes: {
      direction: {
        control: { type: 'select' },
        options: ['vertical', 'horizontal'],
      },
      position: {
        control: { type: 'select' },
        options: ['left', 'right'],
      },
    },
    args: {
      direction: 'vertical',
      position: 'left',
    },
  });
</script>

<Story name="Simple Strings">
  {#snippet template()}
    <RadioField
      name="fruit"
      title="Favourite Fruit"
      items={['Apple', 'Banana', 'Cherry', 'Mango']}
    />
  {/snippet}
</Story>

<Story name="Object Items">
  {#snippet template()}
    <RadioField
      name="plan"
      title="Select Plan"
      subtitle="Choose the plan that best fits your needs."
      items={[
        { label: 'Free', value: 'free', desc: 'Up to 5 projects' },
        { label: 'Pro', value: 'pro', desc: 'Unlimited projects' },
        { label: 'Enterprise', value: 'enterprise', desc: 'Custom pricing' },
      ]}
    />
  {/snippet}
</Story>

<Story name="Horizontal">
  {#snippet template()}
    <RadioField
      name="size"
      title="Select Size"
      direction="horizontal"
      items={['Small', 'Medium', 'Large', 'X-Large']}
    />
  {/snippet}
</Story>

<Story name="Pre-selected">
  {#snippet template()}
    <RadioField
      name="color"
      title="Favourite Color"
      items={['Red', 'Green', 'Blue', 'Yellow']}
      value="Green"
    />
  {/snippet}
</Story>
