<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ChipField from './components/chip-field/chip-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/ChipField',
    component: ChipField,
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
      allowCreate: { control: 'boolean' },
      autoSuggest: { control: 'boolean' },
      disabled: { control: 'boolean' },
    },
    args: {
      appearance: 'normal',
      size: 'md',
      allowCreate: true,
      autoSuggest: true,
    },
  });

  const skillItems = [
    { id: 'js', name: 'JavaScript', desc: 'Frontend & backend scripting' },
    { id: 'ts', name: 'TypeScript', desc: 'Typed superset of JavaScript' },
    { id: 'svelte', name: 'Svelte', desc: 'Reactive UI framework' },
    { id: 'go', name: 'Go', desc: 'Systems programming language' },
    { id: 'py', name: 'Python', desc: 'General purpose, ML, scripting' },
    { id: 'rust', name: 'Rust', desc: 'Memory-safe systems language' },
    { id: 'java', name: 'Java', desc: 'JVM language' },
    { id: 'kotlin', name: 'Kotlin', desc: 'Modern JVM language' },
  ];
</script>

<Story name="Free Text (CSV)">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <ChipField
        {...args}
        name="chips"
        label="Tags"
        placeholder="Type and press Enter or comma"
      />
    </div>
  {/snippet}
</Story>

<Story name="With Items + Autosuggest">
  {#snippet template(args)}
    <div class="max-w-md p-4 h-72">
      <ChipField
        {...args}
        name="skills"
        label="Skills"
        placeholder="Pick or create"
        items={skillItems}
      />
    </div>
  {/snippet}
</Story>

<Story name="Items, No Create">
  {#snippet template(args)}
    <div class="max-w-md p-4 h-80">
      <ChipField
        {...args}
        name="skills"
        label="Pick from list"
        placeholder="Search skills"
        items={skillItems}
        allowCreate={false}
      />
    </div>
  {/snippet}
</Story>

<Story name="Many Chips (Auto Height)">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <ChipField
        {...args}
        name="chips"
        label="Tags"
        value={['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa']}
      />
    </div>
  {/snippet}
</Story>

<Story name="Disabled">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <ChipField
        {...args}
        name="chips"
        label="Tags"
        value={['alpha', 'beta', 'gamma']}
        disabled
      />
    </div>
  {/snippet}
</Story>
