<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Accordion from './components/accordion/accordion.svelte';

  const items = [
    { id: 'q1', title: 'What is Moldex.js?', subtitle: 'About the library' },
    { id: 'q2', title: 'How do I install it?', subtitle: 'Installation guide' },
    { id: 'q3', title: 'Is it free to use?' },
    { id: 'q4', title: 'This item is disabled', disabled: true },
  ];

  const { Story } = defineMeta({
    title: 'Core/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    argTypes: {
      multiple: { control: 'boolean', description: 'Allow multiple panels open at once' },
    },
    args: {
      items,
      multiple: false,
    },
  });
</script>

<Story name="Single Expand">
  {#snippet template()}
    <Accordion {items} multiple={false}>
      {#snippet children({ item })}
        <p>Answer for: <strong>{item.title}</strong> — This is the expanded content area.</p>
      {/snippet}
    </Accordion>
  {/snippet}
</Story>

<Story name="Multiple Expand">
  {#snippet template()}
    <Accordion {items} multiple={true}>
      {#snippet children({ item })}
        <p>Answer for: <strong>{item.title}</strong> — This is the expanded content area.</p>
      {/snippet}
    </Accordion>
  {/snippet}
</Story>
