<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContentArea from './components/content-area/content-area.svelte';
  import Loading from './components/loading/loading.svelte';
  import VirtualScrolling from './components/virtual-scrolling/virtual-scrolling-list.svelte';

  const { Story } = defineMeta({
    title: 'Core/Common',
    component: ContentArea,
    tags: ['autodocs'],
  });
</script>

<Story name="ContentArea Default">
  {#snippet template()}
    <ContentArea className="bg-neutral-50 dark:bg-neutral-900 p-4 min-h-[200px]">
      <p class="text-neutral-700 dark:text-neutral-300">Content area with no sidebar offset.</p>
    </ContentArea>
  {/snippet}
</Story>

<Story name="ContentArea Left Sidebar">
  {#snippet template()}
    <ContentArea sidebarPosition="left" responsiveBreakpoint="md" className="bg-neutral-50 dark:bg-neutral-900 p-4 min-h-[200px]">
      <p class="text-neutral-700 dark:text-neutral-300">Content area offset for a left sidebar (visible at md+ breakpoint).</p>
    </ContentArea>
  {/snippet}
</Story>

<Story name="ContentArea Right Sidebar">
  {#snippet template()}
    <ContentArea sidebarPosition="right" responsiveBreakpoint="lg" className="bg-neutral-50 dark:bg-neutral-900 p-4 min-h-[200px]">
      <p class="text-neutral-700 dark:text-neutral-300">Content area offset for a right sidebar (visible at lg+ breakpoint).</p>
    </ContentArea>
  {/snippet}
</Story>

<Story name="Loading">
  {#snippet template()}
    <div class="h-48 bg-neutral-50 dark:bg-neutral-900 rounded-lg relative">
      <Loading />
    </div>
  {/snippet}
</Story>

<Story name="Loading Custom Color">
  {#snippet template()}
    <div class="h-48 bg-neutral-50 dark:bg-neutral-900 rounded-lg relative">
      <Loading spinnerClassName="text-red-500" />
    </div>
  {/snippet}
</Story>

<Story name="VirtualScrolling">
  {#snippet template()}
    {@const items = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, label: `Item ${i + 1}` }))}
    <div class="border rounded-lg dark:border-neutral-700">
      <VirtualScrolling {items} itemHeight={40} containerHeight={300}>
        {#snippet itemSnippet(item, index)}
          <div class="flex items-center px-4 text-sm text-neutral-700 dark:text-neutral-300 border-b dark:border-neutral-700 {index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800' : ''}">
            <span class="text-neutral-400 w-12">#{item.id}</span>
            <span>{item.label}</span>
          </div>
        {/snippet}
      </VirtualScrolling>
    </div>
  {/snippet}
</Story>
