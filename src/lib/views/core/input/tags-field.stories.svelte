<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TagsField from './components/tags-field/tags-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/TagsField',
    component: TagsField,
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
      disabled: { control: 'boolean' },
    },
    args: {
      appearance: 'normal',
      size: 'md',
      allowCreate: true,
    },
  });

  const skillItems = [
    { id: 'js', name: 'JavaScript', desc: 'Frontend & backend scripting' },
    { id: 'ts', name: 'TypeScript', desc: 'Typed superset of JavaScript' },
    { id: 'svelte', name: 'Svelte', desc: 'Reactive UI framework' },
    { id: 'go', name: 'Go', desc: 'Systems programming language' },
    { id: 'py', name: 'Python', desc: 'General purpose, ML, scripting' },
    { id: 'rust', name: 'Rust', desc: 'Memory-safe systems language' },
  ];
</script>

<Story name="Free Text (CSV)">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <TagsField
        {...args}
        name="tags"
        label="Tags"
        placeholder="Type and press Enter or comma"
      />
      <p class="mt-2 text-xs text-neutral-500">
        Press Enter or "," to add. Backspace on empty input removes last.
      </p>
    </div>
  {/snippet}
</Story>

<Story name="With Items + Desc">
  {#snippet template(args)}
    <div class="max-w-md p-4 h-72">
      <TagsField
        {...args}
        name="skills"
        label="Skills"
        placeholder="Pick or create skills"
        items={skillItems}
      />
    </div>
  {/snippet}
</Story>

<Story name="Items, No Create">
  {#snippet template(args)}
    <div class="max-w-md p-4 h-72">
      <TagsField
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

<Story name="Disabled">
  {#snippet template(args)}
    <div class="max-w-md p-4">
      <TagsField
        {...args}
        name="tags"
        label="Tags"
        value={['alpha', 'beta', 'gamma']}
        disabled
      />
    </div>
  {/snippet}
</Story>
