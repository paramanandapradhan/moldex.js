<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import RangeField from './components/range-field/range-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/RangeField',
    component: RangeField,
    tags: ['autodocs'],
    argTypes: {
      min: { control: 'number' },
      max: { control: 'number' },
      step: { control: 'number' },
      size: {
        control: { type: 'select' },
        options: ['xs', 'sm', 'md', 'lg'],
      },
    },
    args: {
      min: 0,
      max: 100,
      value: 50,
      size: 'md',
    },
  });
</script>

<Story name="Default">
  {#snippet template()}
    <div class="p-4 max-w-sm">
      <RangeField name="volume" value={50} />
    </div>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    <div class="p-4 max-w-sm space-y-6">
      <div>
        <p class="text-xs text-neutral-500 mb-2">xs</p>
        <RangeField name="xs" size="xs" value={30} />
      </div>
      <div>
        <p class="text-xs text-neutral-500 mb-2">sm</p>
        <RangeField name="sm" size="sm" value={50} />
      </div>
      <div>
        <p class="text-xs text-neutral-500 mb-2">md</p>
        <RangeField name="md" size="md" value={70} />
      </div>
      <div>
        <p class="text-xs text-neutral-500 mb-2">lg</p>
        <RangeField name="lg" size="lg" value={90} />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="With Step">
  {#snippet template()}
    <div class="p-4 max-w-sm">
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Step: 10</p>
      <RangeField name="stepped" value={40} min={0} max={100} step={10} />
    </div>
  {/snippet}
</Story>

<Story name="Custom Range">
  {#snippet template()}
    <div class="p-4 max-w-sm">
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Range: 0 – 1000</p>
      <RangeField name="price" value={250} min={0} max={1000} step={50} />
    </div>
  {/snippet}
</Story>
