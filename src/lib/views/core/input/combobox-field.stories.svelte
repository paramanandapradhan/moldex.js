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

<Story name="All Sizes">
  {#snippet template()}
    {@const items = [
      { _id: 'svelte', name: 'Svelte' },
      { _id: 'react', name: 'React' },
      { _id: 'vue', name: 'Vue' },
    ]}
    <div class="flex flex-col gap-4 max-w-md p-4">
      <ComboboxField size="xs" label="xs" {items} placeholder="Pick" />
      <ComboboxField size="sm" label="sm" {items} placeholder="Pick" />
      <ComboboxField size="md" label="md" {items} placeholder="Pick" />
      <ComboboxField size="lg" label="lg" {items} placeholder="Pick" />
    </div>
  {/snippet}
</Story>

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

<Story name="Multiple With Chips">
  {#snippet template()}
    <div class="max-w-md p-4 h-96">
      <ComboboxField
        name="skills"
        label="Skills"
        placeholder="Pick skills"
        multiple
        showChip
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
        value={['svelte', 'typescript']}
      />
      <p class="mt-2 text-xs text-neutral-500">
        Click X on a chip to remove. Open dropdown to add more.
      </p>
    </div>
  {/snippet}
</Story>

<Story name="Multiple With Chips - Strings">
  {#snippet template()}
    <div class="max-w-md p-4 h-96">
      <ComboboxField
        name="tags"
        label="Tags"
        placeholder="Pick tags"
        multiple
        showChip
        hasCheckbox
        items={['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta']}
        value={['Alpha', 'Gamma']}
      />
    </div>
  {/snippet}
</Story>

<Story name="Multiple With Chips - Limited Display">
  {#snippet template()}
    <div class="max-w-md p-4 h-96">
      <ComboboxField
        name="skills"
        label="Show first 2 only"
        placeholder="Pick"
        multiple
        showChip
        hasCheckbox
        displayItemsCount={2}
        items={[
          { _id: 'svelte', name: 'Svelte' },
          { _id: 'react', name: 'React' },
          { _id: 'vue', name: 'Vue' },
          { _id: 'angular', name: 'Angular' },
          { _id: 'typescript', name: 'TypeScript' },
        ]}
        value={['svelte', 'react', 'typescript', 'vue']}
      />
    </div>
  {/snippet}
</Story>

<Story name="Multiple With Chips - Not Removable">
  {#snippet template()}
    <div class="max-w-md p-4 h-96">
      <ComboboxField
        name="skills"
        label="Read-only chips (no X)"
        placeholder="Pick"
        multiple
        showChip
        chipRemovable={false}
        hasCheckbox
        items={[
          { _id: 'svelte', name: 'Svelte' },
          { _id: 'react', name: 'React' },
          { _id: 'vue', name: 'Vue' },
        ]}
        value={['svelte', 'react']}
      />
    </div>
  {/snippet}
</Story>

<Story name="Multiple With Chips - All Sizes">
  {#snippet template()}
    {@const items = [
      { _id: 'svelte', name: 'Svelte' },
      { _id: 'react', name: 'React' },
      { _id: 'vue', name: 'Vue' },
    ]}
    <div class="flex flex-col gap-4 max-w-md p-4">
      <ComboboxField size="xs" label="xs" multiple showChip hasCheckbox {items} value={['svelte', 'react']} placeholder="Pick" />
      <ComboboxField size="sm" label="sm" multiple showChip hasCheckbox {items} value={['svelte', 'react']} placeholder="Pick" />
      <ComboboxField size="md" label="md" multiple showChip hasCheckbox {items} value={['svelte', 'react']} placeholder="Pick" />
      <ComboboxField size="lg" label="lg" multiple showChip hasCheckbox {items} value={['svelte', 'react']} placeholder="Pick" />
    </div>
  {/snippet}
</Story>
