<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import VerticalRuler from './components/vertical-ruler/vertical-ruler.svelte';

  const { Story } = defineMeta({
    title: 'Core/Ruler',
    component: VerticalRuler,
    tags: ['autodocs'],
  });
</script>

<Story name="Default">
  {#snippet template()}
    <div class="flex items-center gap-4 p-4">
      <span class="text-sm text-neutral-600 dark:text-neutral-400">Section A</span>
      <VerticalRuler className="!h-6" />
      <span class="text-sm text-neutral-600 dark:text-neutral-400">Section B</span>
      <VerticalRuler className="!h-6" />
      <span class="text-sm text-neutral-600 dark:text-neutral-400">Section C</span>
    </div>
  {/snippet}
</Story>

<Story name="Tall Ruler">
  {#snippet template()}
    <div class="flex items-center gap-4 p-4">
      <span class="text-sm text-neutral-600 dark:text-neutral-400">Left</span>
      <VerticalRuler className="!h-12" />
      <span class="text-sm text-neutral-600 dark:text-neutral-400">Right</span>
    </div>
  {/snippet}
</Story>

<Story name="Custom Styled">
  {#snippet template()}
    <div class="flex items-center gap-4 p-4">
      <span class="text-sm text-neutral-600 dark:text-neutral-400">Item 1</span>
      <VerticalRuler className="!h-8 !bg-primary" />
      <span class="text-sm text-neutral-600 dark:text-neutral-400">Item 2</span>
    </div>
  {/snippet}
</Story>
