<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Badge from './components/badge/badge.svelte';

  const { Story } = defineMeta({
    title: 'Core/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['primary', 'neutral', 'success', 'warning', 'error', 'info'],
      },
      style: {
        control: { type: 'select' },
        options: ['soft', 'solid', 'outline'],
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'md', 'lg'],
      },
      label: { control: 'text' },
      rounded: { control: 'boolean', description: 'Fully rounded (pill shape)' },
      dot: { control: 'boolean', description: 'Show status dot' },
    },
    args: {
      label: 'Badge',
      variant: 'primary',
      style: 'soft',
      size: 'md',
      rounded: false,
      dot: false,
    },
  });
</script>

<Story name="Primary Soft" args={{ variant: 'primary', label: 'Primary' }} />
<Story name="All Variants">
  {#snippet template()}
    <div class="flex flex-wrap items-center gap-2">
      <Badge variant="primary" label="Primary" />
      <Badge variant="neutral" label="Neutral" />
      <Badge variant="success" label="Success" />
      <Badge variant="warning" label="Warning" />
      <Badge variant="error" label="Error" />
      <Badge variant="info" label="Info" />
    </div>
  {/snippet}
</Story>

<Story name="Styles">
  {#snippet template()}
    <div class="flex flex-col gap-3">
      <div class="flex flex-wrap gap-2">
        <span class="text-xs text-neutral-500 w-16 self-center">Soft</span>
        <Badge style="soft" variant="primary" label="Primary" />
        <Badge style="soft" variant="success" label="Success" />
        <Badge style="soft" variant="warning" label="Warning" />
        <Badge style="soft" variant="error" label="Error" />
      </div>
      <div class="flex flex-wrap gap-2">
        <span class="text-xs text-neutral-500 w-16 self-center">Solid</span>
        <Badge style="solid" variant="primary" label="Primary" />
        <Badge style="solid" variant="success" label="Success" />
        <Badge style="solid" variant="warning" label="Warning" />
        <Badge style="solid" variant="error" label="Error" />
      </div>
      <div class="flex flex-wrap gap-2">
        <span class="text-xs text-neutral-500 w-16 self-center">Outline</span>
        <Badge style="outline" variant="primary" label="Primary" />
        <Badge style="outline" variant="success" label="Success" />
        <Badge style="outline" variant="warning" label="Warning" />
        <Badge style="outline" variant="error" label="Error" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Pill Shape">
  {#snippet template()}
    <div class="flex flex-wrap gap-2">
      <Badge variant="primary" label="New" rounded dot />
      <Badge variant="success" label="Active" rounded dot />
      <Badge variant="error" label="Expired" rounded />
      <Badge variant="neutral" label="Draft" rounded />
    </div>
  {/snippet}
</Story>
