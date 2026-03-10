<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Pagination from './components/pagination/pagination.svelte';

  const { Story } = defineMeta({
    title: 'Core/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    argTypes: {
      itemsCount: { control: { type: 'number', min: 0 }, description: 'Total number of items' },
      pageSize: { control: { type: 'select' }, options: [5, 10, 25, 50], description: 'Items per page' },
      pageIndex: { control: { type: 'number', min: 0 }, description: 'Current page index (0-based)' },
    },
    args: {
      itemsCount: 253,
      pageSize: 10,
      pageIndex: 0,
    },
  });
</script>

<Story name="Default" args={{ itemsCount: 253, pageSize: 10, pageIndex: 0 }} />

<Story name="Mid Page" args={{ itemsCount: 500, pageSize: 25, pageIndex: 5 }} />

<Story name="Last Page">
  {#snippet template()}
    <Pagination itemsCount={100} pageSize={10} pageIndex={9} />
  {/snippet}
</Story>
