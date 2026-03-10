<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ComboboxField from './components/combobox-field/combobox-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/ComboboxField',
    component: ComboboxField,
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
      multiple: { control: 'boolean' },
    },
    args: {
      appearance: 'normal',
      multiple: false,
    },
  });
</script>

<Story name="Simple Strings">
  {#snippet template()}
    <div class="max-w-sm p-4 h-72">
      <ComboboxField
        name="country"
        label="Country"
        placeholder="Select country"
        items={['Australia', 'Canada', 'France', 'Germany', 'India', 'Japan', 'United Kingdom', 'United States']}
      />
    </div>
  {/snippet}
</Story>

<Story name="Object Items">
  {#snippet template()}
    <div class="max-w-sm p-4 h-72">
      <ComboboxField
        name="role"
        label="User Role"
        placeholder="Select role"
        items={[
          { _id: 'admin', name: 'Administrator' },
          { _id: 'editor', name: 'Editor' },
          { _id: 'viewer', name: 'Viewer' },
          { _id: 'guest', name: 'Guest' },
        ]}
      />
    </div>
  {/snippet}
</Story>

<Story name="With Search">
  {#snippet template()}
    <div class="max-w-sm p-4 h-80">
      <ComboboxField
        name="city"
        label="City"
        placeholder="Select city"
        hasDropdownHeader
        hasDropdownHeaderSearch
        items={[
          { _id: 'ny', name: 'New York' },
          { _id: 'la', name: 'Los Angeles' },
          { _id: 'ch', name: 'Chicago' },
          { _id: 'ho', name: 'Houston' },
          { _id: 'ph', name: 'Phoenix' },
          { _id: 'pa', name: 'Philadelphia' },
          { _id: 'sa', name: 'San Antonio' },
          { _id: 'sd', name: 'San Diego' },
        ]}
      />
    </div>
  {/snippet}
</Story>

<Story name="Multiple Select">
  {#snippet template()}
    <div class="max-w-sm p-4 h-80">
      <ComboboxField
        name="skills"
        label="Skills"
        placeholder="Select skills"
        multiple
        hasCheckbox
        hasDropdownHeader
        hasDropdownHeaderSearch
        items={[
          { _id: 'svelte', name: 'Svelte' },
          { _id: 'react', name: 'React' },
          { _id: 'vue', name: 'Vue' },
          { _id: 'angular', name: 'Angular' },
          { _id: 'typescript', name: 'TypeScript' },
          { _id: 'tailwind', name: 'Tailwind CSS' },
        ]}
      />
    </div>
  {/snippet}
</Story>

<Story name="With Subtitle">
  {#snippet template()}
    <div class="max-w-sm p-4 h-80">
      <ComboboxField
        name="plan"
        label="Subscription Plan"
        placeholder="Select plan"
        subtitleFieldName="subtitle"
        items={[
          { _id: 'free', name: 'Free', subtitle: 'Up to 5 projects' },
          { _id: 'pro', name: 'Pro', subtitle: 'Unlimited projects' },
          { _id: 'enterprise', name: 'Enterprise', subtitle: 'Custom pricing' },
        ]}
      />
    </div>
  {/snippet}
</Story>

<Story name="Appearances">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <ComboboxField name="c1" label="Normal" appearance="normal" placeholder="Normal" items={['A', 'B', 'C']} />
      <ComboboxField name="c2" label="Box" appearance="box" placeholder="Box" items={['A', 'B', 'C']} />
      <ComboboxField name="c3" label="Fill" appearance="fill" placeholder="Fill" items={['A', 'B', 'C']} />
      <ComboboxField name="c4" label="Underline" appearance="underline" placeholder="Underline" items={['A', 'B', 'C']} />
    </div>
  {/snippet}
</Story>
