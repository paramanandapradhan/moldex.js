<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NoData from './components/no-data/no-data.svelte';
  import { mdiMagnify, mdiFlowerTulip } from '../icon/index.js';

  const { Story } = defineMeta({
    title: 'Core/NoData',
    component: NoData,
    tags: ['autodocs'],
    argTypes: {
      message: { control: 'text' },
      iconPlacement: {
        control: { type: 'select' },
        options: ['top', 'bottom', 'left', 'right'],
      },
    },
    args: {
      message: 'No data found!',
      iconPlacement: 'top',
    },
  });
</script>

<Story name="Default" args={{ message: 'No data found!' }} />

<Story name="With Icon">
  {#snippet template()}
    <NoData message="No results found." iconPath={mdiMagnify} iconClassName="text-neutral-400 w-10 h-10" />
  {/snippet}
</Story>

<Story name="Icon Left">
  {#snippet template()}
    <NoData message="Nothing here yet." iconPath={mdiFlowerTulip} iconPlacement="left" iconClassName="text-primary w-8 h-8" />
  {/snippet}
</Story>

<Story name="Custom Content">
  {#snippet template()}
    <NoData>
      {#snippet children()}
        <div class="text-center">
          <div class="text-4xl mb-3">📭</div>
          <h3 class="font-semibold text-neutral-800 dark:text-neutral-200">Your inbox is empty</h3>
          <p class="text-sm text-neutral-500 mt-1">Messages will appear here when received.</p>
        </div>
      {/snippet}
    </NoData>
  {/snippet}
</Story>
