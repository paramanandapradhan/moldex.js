<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Tabs from './components/tabs/tabs.svelte';

  const sampleTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics', badge: 3 },
    { id: 'settings', label: 'Settings' },
    { id: 'disabled', label: 'Disabled', disabled: true },
  ];

  const { Story } = defineMeta({
    title: 'Core/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['underline', 'pills', 'bordered'],
        description: 'Visual style of tabs',
      },
    },
    args: {
      tabs: sampleTabs,
      variant: 'underline',
    },
  });
</script>

<Story name="Underline">
  {#snippet template()}
    <Tabs tabs={sampleTabs} variant="underline">
      {#snippet children({ activeTab })}
        <div class="p-4 text-neutral-700 dark:text-neutral-300">
          Content for: <strong>{activeTab}</strong>
        </div>
      {/snippet}
    </Tabs>
  {/snippet}
</Story>

<Story name="Pills">
  {#snippet template()}
    <Tabs tabs={sampleTabs} variant="pills">
      {#snippet children({ activeTab })}
        <div class="p-4 text-neutral-700 dark:text-neutral-300">
          Content for: <strong>{activeTab}</strong>
        </div>
      {/snippet}
    </Tabs>
  {/snippet}
</Story>

<Story name="Bordered">
  {#snippet template()}
    <Tabs tabs={sampleTabs} variant="bordered">
      {#snippet children({ activeTab })}
        <div class="p-4 text-neutral-700 dark:text-neutral-300">
          Content for: <strong>{activeTab}</strong>
        </div>
      {/snippet}
    </Tabs>
  {/snippet}
</Story>
