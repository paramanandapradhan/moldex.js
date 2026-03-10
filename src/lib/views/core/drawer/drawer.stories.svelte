<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Drawer from './components/drawer/drawer.svelte';
  import Button from '../button/components/button/button.svelte';
  import ButtonClose from '../button/components/button-close-icon/button-close-icon.svelte';

  const { Story } = defineMeta({
    title: 'Core/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    argTypes: {
      position: {
        control: { type: 'select' },
        options: ['left', 'right', 'top', 'bottom'],
        description: 'Which side the drawer slides in from',
      },
    },
    args: {
      position: 'left',
    },
  });
</script>

<Story name="Left (default)">
  {#snippet template()}
    <script>
      let drawerRef;
    </script>
    <div class="p-4">
      <Button appearance="primary" label="Open Left Drawer" onClick={() => drawerRef?.openDrawer()} />
      <Drawer bind:this={drawerRef} position="left">
        {#snippet children()}
          <div class="p-4">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-semibold text-lg text-neutral-900 dark:text-neutral-100">Navigation</h2>
            </div>
            <nav class="flex flex-col gap-1">
              {#each ['Dashboard', 'Analytics', 'Settings', 'Profile'] as item}
                <button type="button" class="text-left px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm">
                  {item}
                </button>
              {/each}
            </nav>
          </div>
        {/snippet}
      </Drawer>
    </div>
  {/snippet}
</Story>

<Story name="Right">
  {#snippet template()}
    <script>
      let drawerRight;
    </script>
    <div class="p-4">
      <Button appearance="primary" label="Open Right Drawer" onClick={() => drawerRight?.openDrawer()} />
      <Drawer bind:this={drawerRight} position="right">
        {#snippet children()}
          <div class="p-4">
            <h2 class="font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Details Panel</h2>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Right-side drawer content.</p>
          </div>
        {/snippet}
      </Drawer>
    </div>
  {/snippet}
</Story>

<Story name="Bottom Sheet">
  {#snippet template()}
    <script>
      let drawerBottom;
    </script>
    <div class="p-4">
      <Button appearance="primary" label="Open Bottom Sheet" onClick={() => drawerBottom?.openDrawer()} />
      <Drawer bind:this={drawerBottom} position="bottom" className="w-full h-64">
        {#snippet children()}
          <div class="p-4">
            <h2 class="font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Bottom Sheet</h2>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">This slides up from the bottom. Press browser Back or swipe to close.</p>
          </div>
        {/snippet}
      </Drawer>
    </div>
  {/snippet}
</Story>
