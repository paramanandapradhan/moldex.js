<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DetailListField from './components/detail-list-field/detail-list-field.svelte';
  import { mdiAccount, mdiEmailOutline, mdiPhone, mdiHome } from '$lib/views/core/icon';

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
      useNativeDatalist: { control: 'boolean' },
      disabled: { control: 'boolean' },
      required: { control: 'boolean' },
    },
    args: {
      appearance: 'normal',
      size: 'md',
      useNativeDatalist: false,
    },
  });

  const browsers = [
    { id: 'edge', label: 'Edge', value: 'Edge', desc: 'Microsoft Edge' },
    { id: 'firefox', label: 'Firefox', value: 'Firefox', desc: 'Mozilla Firefox' },
    { id: 'chrome', label: 'Chrome', value: 'Chrome', desc: 'Google Chrome' },
    { id: 'opera', label: 'Opera', value: 'Opera', desc: 'Opera browser' },
    { id: 'safari', label: 'Safari', value: 'Safari', desc: 'Apple Safari' },
    { id: 'brave', label: 'Brave', value: 'Brave', desc: 'Privacy-focused browser' },
  ];

  const skills = [
    { id: 'js', label: 'JavaScript', value: 'JavaScript', desc: 'Frontend & backend scripting', iconPath: mdiAccount },
    { id: 'ts', label: 'TypeScript', value: 'TypeScript', desc: 'Typed superset of JavaScript', iconPath: mdiAccount },
    { id: 'svelte', label: 'Svelte', value: 'Svelte', desc: 'Reactive UI framework', iconPath: mdiAccount },
    { id: 'go', label: 'Go', value: 'Go', desc: 'Systems language', iconPath: mdiAccount },
    { id: 'py', label: 'Python', value: 'Python', desc: 'General purpose', iconPath: mdiAccount },
    { id: 'rust', label: 'Rust', value: 'Rust', desc: 'Memory-safe systems', iconPath: mdiAccount },
  ];

  const contacts = [
    { id: 1, label: 'Param Pradhan', value: 'param@example.com', desc: 'crawlinktest@gmail.com', iconPath: mdiAccount },
    { id: 2, label: 'Alice Smith', value: 'alice@example.com', desc: 'alice.smith@example.com', iconPath: mdiAccount },
    { id: 3, label: 'Bob Jones', value: 'bob@example.com', desc: 'bob.jones@example.com', iconPath: mdiAccount },
    { id: 4, label: 'Carol Davis', value: 'carol@example.com', desc: 'carol.davis@example.com', iconPath: mdiAccount },
  ];
</script>

<Story name="Browser Picker (Datalist Style)">
  {#snippet template(args)}
    <div class="max-w-md p-4 h-80">
      <DetailListField
        {...args}
        label="Choose your browser from the list"
        placeholder="Type or pick..."
        items={browsers}
      />
    </div>
  {/snippet}
</Story>

<Story name="With Icons + Description">
  {#snippet template(args)}
    <div class="max-w-md p-4 h-96">
      <DetailListField
        {...args}
        label="Skill"
        placeholder="Search skills..."
        items={skills}
      />
    </div>
  {/snippet}
</Story>

<Story name="Contact Picker">
  {#snippet template(args)}
    <div class="max-w-md p-4 h-96">
      <DetailListField
        {...args}
        label="To"
        placeholder="Search contacts..."
        items={contacts}
        labelFieldName="label"
        valueFieldName="value"
        descFieldName="desc"
      />
    </div>
  {/snippet}
</Story>

<Story name="Native HTML Datalist">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <DetailListField
        {...args}
        label="Choose your browser (native datalist)"
        placeholder="Type or pick..."
        items={browsers}
        useNativeDatalist={true}
      />
      <p class="mt-2 text-xs text-neutral-500">
        Uses native &lt;datalist&gt; — browser-rendered suggestions.
      </p>
    </div>
  {/snippet}
</Story>

<Story name="Min Search Length">
  {#snippet template(args)}
    <div class="max-w-md p-4 h-96">
      <DetailListField
        {...args}
        label="Type at least 2 characters"
        placeholder="Search..."
        items={skills}
        minSearchLength={2}
      />
    </div>
  {/snippet}
</Story>

<Story name="Custom Item Snippet">
  {#snippet template(args)}
    <div class="max-w-md p-4 h-96">
      <DetailListField
        {...args}
        label="Custom Rendering"
        placeholder="Search skills..."
        items={skills}
      >
        {#snippet itemSnippet(item, index)}
          <div class="flex w-full items-center justify-between gap-3">
            <span class="text-neutral-400 text-xs">#{index + 1}</span>
            <span class="font-semibold flex-1">{item.label}</span>
            <span class="text-xs text-primary-500">{item.desc}</span>
          </div>
        {/snippet}
      </DetailListField>
    </div>
  {/snippet}
</Story>

<Story name="All Sizes">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-md p-4">
      <DetailListField size="xs" label="xs" placeholder="Browser..." items={browsers} />
      <DetailListField size="sm" label="sm" placeholder="Browser..." items={browsers} />
      <DetailListField size="md" label="md" placeholder="Browser..." items={browsers} />
      <DetailListField size="lg" label="lg" placeholder="Browser..." items={browsers} />
    </div>
  {/snippet}
</Story>

<Story name="All Appearances">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-md p-4">
      <DetailListField appearance="normal" label="normal" placeholder="..." items={browsers} />
      <DetailListField appearance="box" label="box" placeholder="..." items={browsers} />
      <DetailListField appearance="fill" label="fill" placeholder="..." items={browsers} />
      <DetailListField appearance="underline" label="underline" placeholder="..." items={browsers} />
      <DetailListField appearance="fill-underline" label="fill-underline" placeholder="..." items={browsers} />
    </div>
  {/snippet}
</Story>

<Story name="Disabled">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <DetailListField
        {...args}
        label="Disabled"
        value="Chrome"
        items={browsers}
        disabled
      />
    </div>
  {/snippet}
</Story>
