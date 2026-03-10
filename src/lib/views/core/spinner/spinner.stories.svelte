<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Spinner from './components/spinner/spinner.svelte';

  const { Story } = defineMeta({
    title: 'Core/Spinner',
    component: Spinner,
    tags: ['autodocs'],
    argTypes: {
      className: { control: 'text', description: 'Additional CSS classes (e.g. w-8 h-8 text-primary)' },
    },
    args: {
      className: '',
    },
  });
</script>

<Story name="Default" />

<Story name="Sizes">
  {#snippet template()}
    <div class="flex items-center gap-6">
      <Spinner className="w-4 h-4" />
      <Spinner className="w-6 h-6" />
      <Spinner className="w-8 h-8" />
      <Spinner className="w-12 h-12" />
    </div>
  {/snippet}
</Story>

<Story name="Colors">
  {#snippet template()}
    <div class="flex items-center gap-6">
      <Spinner className="w-8 h-8 text-primary" />
      <Spinner className="w-8 h-8 text-neutral-500" />
      <Spinner className="w-8 h-8 text-green-500" />
      <Spinner className="w-8 h-8 text-red-500" />
    </div>
  {/snippet}
</Story>
