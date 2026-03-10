<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Sidebar from './components/sidebar.svelte';

  const { Story } = defineMeta({
    title: 'Core/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    argTypes: {
      position: {
        control: { type: 'select' },
        options: ['left', 'right'],
      },
      responsiveBreakpoint: {
        control: { type: 'select' },
        options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
        description: 'Breakpoint at which sidebar becomes fixed/visible',
      },
    },
    args: {
      position: 'left',
      responsiveBreakpoint: 'md',
    },
  });
</script>

<Story name="Left Sidebar">
  {#snippet template()}
    <div class="relative flex min-h-[400px] border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <Sidebar responsiveBreakpoint="xs" className="border-r border-neutral-200 dark:border-neutral-700">
        {#snippet children()}
          <div class="flex flex-col gap-1 p-3">
            {#each ['Dashboard', 'Products', 'Orders', 'Customers', 'Reports', 'Settings'] as label}
              <button type="button" class="text-left px-3 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                {label}
              </button>
            {/each}
          </div>
        {/snippet}
      </Sidebar>
      <main class="flex-grow p-6">
        <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Main Content</h1>
        <p class="text-neutral-600 dark:text-neutral-400 text-sm">The sidebar is fixed to the left and the main content fills the rest.</p>
      </main>
    </div>
  {/snippet}
</Story>

<Story name="Right Sidebar">
  {#snippet template()}
    <div class="relative flex min-h-[300px] border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <main class="flex-grow p-6">
        <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Main Content</h1>
        <p class="text-neutral-600 dark:text-neutral-400 text-sm">Content with a right-side sidebar.</p>
      </main>
      <Sidebar position="right" responsiveBreakpoint="xs" className="border-l border-neutral-200 dark:border-neutral-700">
        {#snippet children()}
          <div class="p-4">
            <h3 class="font-medium text-sm text-neutral-700 dark:text-neutral-300 mb-2">Details</h3>
            <p class="text-xs text-neutral-500">Right sidebar content.</p>
          </div>
        {/snippet}
      </Sidebar>
    </div>
  {/snippet}
</Story>
