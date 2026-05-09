<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DetailListField from './components/detail-list-field/detail-list-field.svelte';
  import { mdiAccount, mdiEmail, mdiPhone, mdiMapMarker } from '$lib/views/core/icon';

  const { Story } = defineMeta({
    title: 'Core/Input/DetailListField',
    component: DetailListField,
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
      direction: {
        control: { type: 'inline-radio' },
        options: ['horizontal', 'vertical'],
      },
      dividers: { control: 'boolean' },
    },
    args: {
      appearance: 'normal',
      size: 'md',
      direction: 'horizontal',
      dividers: true,
    },
  });

  const profile = [
    { id: 'name', label: 'Name', value: 'Param Pradhan' },
    { id: 'email', label: 'Email', value: 'crawlinktest@gmail.com' },
    { id: 'phone', label: 'Phone', value: '+91 98765 43210' },
    { id: 'addr', label: 'Address', value: 'Bhubaneswar, Odisha' },
  ];

  const profileWithIcons = [
    { id: 'name', label: 'Name', value: 'Param Pradhan', iconPath: mdiAccount },
    { id: 'email', label: 'Email', value: 'crawlinktest@gmail.com', iconPath: mdiEmail },
    { id: 'phone', label: 'Phone', value: '+91 98765 43210', iconPath: mdiPhone },
    { id: 'addr', label: 'Address', value: 'Bhubaneswar, Odisha', iconPath: mdiMapMarker },
  ];

  const withDesc = [
    { id: 'plan', label: 'Plan', value: 'Pro', desc: 'Renews on 2026-06-01' },
    { id: 'seats', label: 'Seats', value: '5 / 10', desc: 'Add more in settings' },
    { id: 'usage', label: 'Usage', value: '42 GB', desc: '58 GB remaining' },
  ];
</script>

<Story name="Horizontal Detail">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <DetailListField {...args} label="Profile" items={profile} />
    </div>
  {/snippet}
</Story>

<Story name="Vertical Detail">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <DetailListField {...args} label="Profile" items={profile} direction="vertical" />
    </div>
  {/snippet}
</Story>

<Story name="With Icons">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <DetailListField {...args} label="Contact" items={profileWithIcons} />
    </div>
  {/snippet}
</Story>

<Story name="With Description">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <DetailListField {...args} label="Subscription" items={withDesc} direction="vertical" />
    </div>
  {/snippet}
</Story>

<Story name="Clickable Rows">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <DetailListField
        {...args}
        label="Settings"
        items={profileWithIcons}
        onItemClick={(item) => alert('Clicked: ' + item.label)}
      />
    </div>
  {/snippet}
</Story>

<Story name="Custom Item Snippet">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <DetailListField {...args} label="Custom Rows" items={profileWithIcons}>
        {#snippet itemSnippet(item, index)}
          <div class="flex items-center justify-between gap-3">
            <span class="text-neutral-500">#{index + 1}</span>
            <span class="font-semibold flex-1">{item.label}</span>
            <span class="text-primary">{item.value}</span>
          </div>
        {/snippet}
      </DetailListField>
    </div>
  {/snippet}
</Story>

<Story name="Empty State">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <DetailListField {...args} label="Empty" items={[]} emptyMessage="Nothing here yet" />
    </div>
  {/snippet}
</Story>

<Story name="No Dividers">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <DetailListField {...args} label="Compact" items={profile} dividers={false} />
    </div>
  {/snippet}
</Story>

<Story name="All Sizes">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-md p-4">
      <DetailListField size="xs" label="xs" items={profile} />
      <DetailListField size="sm" label="sm" items={profile} />
      <DetailListField size="md" label="md" items={profile} />
      <DetailListField size="lg" label="lg" items={profile} />
    </div>
  {/snippet}
</Story>

<Story name="All Appearances">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-md p-4">
      <DetailListField appearance="normal" label="normal" items={profile} />
      <DetailListField appearance="box" label="box" items={profile} />
      <DetailListField appearance="fill" label="fill" items={profile} />
      <DetailListField appearance="underline" label="underline" items={profile} />
      <DetailListField appearance="none" label="none" items={profile} />
    </div>
  {/snippet}
</Story>
