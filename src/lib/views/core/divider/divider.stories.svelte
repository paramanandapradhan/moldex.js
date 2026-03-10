<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Divider from './components/divider/divider.svelte';

  const { Story } = defineMeta({
    title: 'Core/Divider',
    component: Divider,
    tags: ['autodocs'],
    argTypes: {
      orientation: {
        control: { type: 'select' },
        options: ['horizontal', 'vertical'],
      },
      align: {
        control: { type: 'select' },
        options: ['start', 'center', 'end'],
      },
      label: { control: 'text' },
    },
    args: {
      orientation: 'horizontal',
      align: 'center',
    },
  });
</script>

<Story name="Plain Horizontal">
  {#snippet template()}
    <div class="space-y-4 p-4 max-w-md">
      <p class="text-neutral-600 dark:text-neutral-400">Content above the divider</p>
      <Divider />
      <p class="text-neutral-600 dark:text-neutral-400">Content below the divider</p>
    </div>
  {/snippet}
</Story>

<Story name="With Label Center">
  {#snippet template()}
    <div class="space-y-4 p-4 max-w-md">
      <Divider label="OR" align="center" />
    </div>
  {/snippet}
</Story>

<Story name="With Label Start">
  {#snippet template()}
    <div class="space-y-4 p-4 max-w-md">
      <Divider label="Section A" align="start" />
    </div>
  {/snippet}
</Story>

<Story name="Vertical">
  {#snippet template()}
    <div class="flex items-center gap-4 h-12 p-4">
      <span class="text-neutral-600 dark:text-neutral-400">Left</span>
      <Divider orientation="vertical" />
      <span class="text-neutral-600 dark:text-neutral-400">Right</span>
    </div>
  {/snippet}
</Story>
