<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TextChip from './components/text-chip/text-chip.svelte';

  const { Story } = defineMeta({
    title: 'Core/Text/TextChip',
    component: TextChip,
    tags: ['autodocs'],
    args: { showDesc: false },
  });

  const skillItems = [
    { id: 'js', name: 'JavaScript', desc: 'Frontend scripting' },
    { id: 'ts', name: 'TypeScript', desc: 'Typed JS' },
    { id: 'svelte', name: 'Svelte', desc: 'Reactive UI framework' },
  ];
</script>

<Story name="CSV String">
  {#snippet template(args)}
    <div class="p-4">
      <TextChip {...args} value="alpha, beta, gamma" />
    </div>
  {/snippet}
</Story>

<Story name="Array Of Strings">
  {#snippet template(args)}
    <div class="p-4">
      <TextChip {...args} value={['red', 'green', 'blue']} />
    </div>
  {/snippet}
</Story>

<Story name="With Items Lookup">
  {#snippet template(args)}
    <div class="p-4">
      <TextChip {...args} value={['js', 'svelte']} items={skillItems} />
    </div>
  {/snippet}
</Story>

<Story name="With Desc">
  {#snippet template(args)}
    <div class="p-4">
      <TextChip {...args} value={['js', 'ts']} items={skillItems} showDesc />
    </div>
  {/snippet}
</Story>
