<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Breadcrumb from './components/breadcrumb/breadcrumb.svelte';

  const { Story } = defineMeta({
    title: 'Core/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    argTypes: {
      showHomeIcon: { control: 'boolean', description: 'Show home icon on the first item' },
    },
    args: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Widget Pro' },
      ],
      showHomeIcon: false,
    },
  });
</script>

<Story name="Default">
  {#snippet template()}
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Widget Pro' },
      ]}
    />
  {/snippet}
</Story>

<Story name="With Home Icon">
  {#snippet template()}
    <Breadcrumb
      showHomeIcon
      items={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings' },
      ]}
    />
  {/snippet}
</Story>

<Story name="Deep Navigation">
  {#snippet template()}
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Library', href: '/library' },
        { label: 'Data', href: '/library/data' },
        { label: 'Books', href: '/library/data/books' },
        { label: 'Svelte 5' },
      ]}
    />
  {/snippet}
</Story>
