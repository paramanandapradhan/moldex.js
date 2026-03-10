<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Progressbar from './components/progressbar/progressbar.svelte';

  const { Story } = defineMeta({
    title: 'Core/Progressbar',
    component: Progressbar,
    tags: ['autodocs'],
    argTypes: {
      value: { control: { type: 'range', min: 0, max: 100 }, description: 'Progress value (0–100)' },
      showValue: { control: 'boolean', description: 'Display percentage inside bar' },
      className: { control: 'text', description: 'Additional classes for the fill bar (e.g. h-2 h-6)' },
    },
    args: {
      value: 60,
      showValue: false,
      className: 'h-4',
    },
  });
</script>

<Story name="Default" args={{ value: 60 }} />

<Story name="Show Value" args={{ value: 75, showValue: true }} />

<Story name="Thin" args={{ value: 40, className: 'h-1' }} />

<Story name="Thick" args={{ value: 40, className: 'h-6', showValue: true }} />

<Story name="Steps">
  {#snippet template()}
    <div class="flex flex-col gap-3 w-full max-w-md">
      {#each [10, 25, 50, 75, 90, 100] as val}
        <div class="flex items-center gap-3">
          <span class="text-xs text-neutral-500 w-8 text-right">{val}%</span>
          <div class="flex-grow">
            <Progressbar value={val} className="h-3" showValue={false} />
          </div>
        </div>
      {/each}
    </div>
  {/snippet}
</Story>
