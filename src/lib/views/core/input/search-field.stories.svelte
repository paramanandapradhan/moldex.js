<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SearchField from './components/search-field/search-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/SearchField',
    component: SearchField,
    tags: ['autodocs'],
    argTypes: {
      appearance: {
        control: { type: 'select' },
        options: ['normal', 'box', 'fill', 'underline', 'fill-underline', 'none'],
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'sm', 'md', 'lg'],
      },
      placeholder: { control: 'text' },
    },
    args: {
      placeholder: 'Search...',
      appearance: 'normal',
    },
  });
</script>

<Story name="Default">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <SearchField name="search" placeholder="Search items..." />
    </div>
  {/snippet}
</Story>

<Story name="Appearances">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <SearchField name="s1" placeholder="Normal search" appearance="normal" />
      <SearchField name="s2" placeholder="Box search" appearance="box" />
      <SearchField name="s3" placeholder="Fill search" appearance="fill" />
      <SearchField name="s4" placeholder="Underline search" appearance="underline" />
      <SearchField name="s5" placeholder="Fill Underline search" appearance="fill-underline" />
    </div>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <SearchField name="sxs" placeholder="XS search" size="xs" />
      <SearchField name="ssm" placeholder="SM search" size="sm" />
      <SearchField name="smd" placeholder="MD search" size="md" />
      <SearchField name="slg" placeholder="LG search" size="lg" />
    </div>
  {/snippet}
</Story>
