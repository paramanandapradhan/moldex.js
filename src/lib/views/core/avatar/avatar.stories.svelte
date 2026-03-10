<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Avatar from './components/avatar/avatar.svelte';

  const { Story } = defineMeta({
    title: 'Core/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
      size: {
        control: { type: 'select' },
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      shape: {
        control: { type: 'select' },
        options: ['circle', 'square', 'rounded'],
      },
      status: {
        control: { type: 'select' },
        options: [undefined, 'online', 'offline', 'away', 'busy'],
      },
      src: { control: 'text' },
      initials: { control: 'text' },
    },
    args: {
      size: 'md',
      shape: 'circle',
    },
  });
</script>

<Story name="Initials" args={{ initials: 'JD', size: 'md' }} />

<Story name="Icon Fallback" args={{ size: 'md' }} />

<Story name="With Image" args={{ src: 'https://i.pravatar.cc/100', alt: 'User', size: 'md' }} />

<Story name="Status Indicators">
  {#snippet template()}
    <div class="flex items-end gap-4">
      <Avatar initials="ON" size="md" status="online" />
      <Avatar initials="OF" size="md" status="offline" />
      <Avatar initials="AW" size="md" status="away" />
      <Avatar initials="BS" size="md" status="busy" />
    </div>
  {/snippet}
</Story>

<Story name="All Sizes">
  {#snippet template()}
    <div class="flex items-end gap-4">
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="md" />
      <Avatar initials="LG" size="lg" />
      <Avatar initials="XL" size="xl" />
    </div>
  {/snippet}
</Story>

<Story name="Shapes">
  {#snippet template()}
    <div class="flex items-center gap-4">
      <div class="text-center">
        <Avatar initials="CI" size="lg" shape="circle" />
        <p class="text-xs text-neutral-500 mt-2">Circle</p>
      </div>
      <div class="text-center">
        <Avatar initials="RD" size="lg" shape="rounded" />
        <p class="text-xs text-neutral-500 mt-2">Rounded</p>
      </div>
      <div class="text-center">
        <Avatar initials="SQ" size="lg" shape="square" />
        <p class="text-xs text-neutral-500 mt-2">Square</p>
      </div>
    </div>
  {/snippet}
</Story>
