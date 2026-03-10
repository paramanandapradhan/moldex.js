<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Tooltip from './components/tooltip/tooltip.svelte';
  import Button from '../button/components/button/button.svelte';

  const { Story } = defineMeta({
    title: 'Core/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    argTypes: {
      text: { control: 'text', description: 'Tooltip text' },
      position: {
        control: { type: 'select' },
        options: ['top', 'bottom', 'left', 'right'],
      },
    },
    args: {
      text: 'This is a tooltip',
      position: 'top',
    },
  });
</script>

<Story name="Top">
  {#snippet template()}
    <div class="flex items-center justify-center p-16">
      <Tooltip text="This appears on top" position="top">
        {#snippet children()}
          <Button appearance="primary" label="Hover me (top)" />
        {/snippet}
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="All Positions">
  {#snippet template()}
    <div class="grid grid-cols-2 gap-8 p-16 place-items-center">
      {#each ['top', 'bottom', 'left', 'right'] as pos}
        <Tooltip text="Position: {pos}" position={pos}>
          {#snippet children()}
            <Button appearance="border" label={pos} className="capitalize" />
          {/snippet}
        </Tooltip>
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="With Delay">
  {#snippet template()}
    <div class="flex items-center justify-center p-16">
      <Tooltip text="Appears after 500ms" position="top" delay={500}>
        {#snippet children()}
          <Button appearance="neutral" label="Hover (delayed 500ms)" />
        {/snippet}
      </Tooltip>
    </div>
  {/snippet}
</Story>
