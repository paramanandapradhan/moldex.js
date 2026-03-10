<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './components/button/button.svelte';
  import { mdiAccount, mdiHome } from '../icon/index.js';

  const { Story } = defineMeta({
    title: 'Core/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      appearance: {
        control: { type: 'select' },
        options: ['none', 'primary', 'neutral', 'border', 'border-neutral', 'border-primary'],
        description: 'Visual style of the button',
      },
      size: {
        control: { type: 'select' },
        options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
        description: 'Size of the button',
      },
      label: { control: 'text', description: 'Button label text' },
      disabled: { control: 'boolean' },
      spinner: { control: 'boolean', description: 'Show loading spinner' },
    },
    args: {
      label: 'Button',
      size: 'md',
      appearance: 'primary',
      disabled: false,
      spinner: false,
    },
  });
</script>

<!-- Primary button — main call to action -->
<Story name="Primary" args={{ appearance: 'primary', label: 'Primary' }} />

<Story name="Neutral" args={{ appearance: 'neutral', label: 'Neutral' }} />

<Story name="Border" args={{ appearance: 'border', label: 'Border' }} />

<Story name="Border Primary" args={{ appearance: 'border-primary', label: 'Border Primary' }} />

<Story name="None / Text" args={{ appearance: 'none', label: 'Text Button' }} />

<Story name="All Sizes">
  {#snippet template()}
    <div class="flex flex-wrap items-center gap-3">
      <Button appearance="primary" size="xs" label="XSmall" />
      <Button appearance="primary" size="sm" label="Small" />
      <Button appearance="primary" size="md" label="Medium" />
      <Button appearance="primary" size="lg" label="Large" />
      <Button appearance="primary" size="xl" label="XLarge" />
      <Button appearance="primary" size="2xl" label="2XLarge" />
    </div>
  {/snippet}
</Story>

<Story name="With Icon">
  {#snippet template()}
    <div class="flex flex-wrap items-center gap-3">
      <Button appearance="primary" label="With Left Icon" iconPath={mdiAccount} />
      <Button appearance="neutral" label="With Right Icon" rightIconPath={mdiHome} />
      <Button appearance="border" iconPath={mdiAccount} />
    </div>
  {/snippet}
</Story>

<Story name="With Spinner">
  {#snippet template()}
    <div class="flex flex-wrap items-center gap-3">
      <Button appearance="primary" label="Loading..." spinner={true} />
      <Button appearance="neutral" label="Saving..." spinner={true} />
    </div>
  {/snippet}
</Story>

<Story name="Disabled" args={{ appearance: 'primary', label: 'Disabled', disabled: true }} />

<Story name="All Appearances">
  {#snippet template()}
    <div class="flex flex-wrap items-center gap-3">
      <Button appearance="primary" label="Primary" />
      <Button appearance="neutral" label="Neutral" />
      <Button appearance="border" label="Border" />
      <Button appearance="border-primary" label="Border Primary" />
      <Button appearance="border-neutral" label="Border Neutral" />
      <Button appearance="none" label="None" />
    </div>
  {/snippet}
</Story>
