<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from './components/card/card.svelte';
  import Button from '../button/components/button/button.svelte';
  import Badge from '../badge/components/badge/badge.svelte';

  const { Story } = defineMeta({
    title: 'Core/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['elevated', 'outlined', 'filled'],
      },
      hoverable: { control: 'boolean' },
      padding: { control: 'boolean' },
    },
    args: {
      variant: 'elevated',
      hoverable: false,
      padding: true,
    },
  });
</script>

<Story name="Elevated">
  {#snippet template()}
    <Card variant="elevated" className="max-w-sm">
      {#snippet children()}
        <p class="text-neutral-600 dark:text-neutral-400">This is an elevated card with shadow and border.</p>
      {/snippet}
    </Card>
  {/snippet}
</Story>

<Story name="Outlined">
  {#snippet template()}
    <Card variant="outlined" className="max-w-sm">
      {#snippet children()}
        <p class="text-neutral-600 dark:text-neutral-400">This is an outlined card with a prominent border.</p>
      {/snippet}
    </Card>
  {/snippet}
</Story>

<Story name="With Header and Footer">
  {#snippet template()}
    <Card variant="elevated" className="max-w-sm">
      {#snippet header()}
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-neutral-900 dark:text-neutral-100">Card Title</h3>
          <Badge variant="primary" label="New" />
        </div>
      {/snippet}
      {#snippet children()}
        <p class="text-neutral-600 dark:text-neutral-400">
          Card body content goes here. You can put any content inside.
        </p>
      {/snippet}
      {#snippet footer()}
        <div class="flex justify-end gap-2">
          <Button appearance="neutral" size="sm" label="Cancel" />
          <Button appearance="primary" size="sm" label="Confirm" />
        </div>
      {/snippet}
    </Card>
  {/snippet}
</Story>

<Story name="Hoverable">
  {#snippet template()}
    <div class="flex gap-4">
      {#each ['Card One', 'Card Two', 'Card Three'] as title}
        <Card variant="elevated" hoverable className="w-40">
          {#snippet children()}
            <p class="font-medium text-neutral-800 dark:text-neutral-200">{title}</p>
            <p class="text-sm text-neutral-500 mt-1">Click me</p>
          {/snippet}
        </Card>
      {/each}
    </div>
  {/snippet}
</Story>
