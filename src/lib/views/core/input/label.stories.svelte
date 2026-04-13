<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Label from './components/label/label.svelte';

  const { Story } = defineMeta({
    title: 'Core/Label',
    component: Label,
    tags: ['autodocs'],
    argTypes: {
      label: { control: 'text' },
      required: { control: 'boolean' },
      requiredSymbol: { control: 'text' },
      requiredSymbolColor: { control: 'color' },
      hasRequiredSymbol: { control: 'boolean' },
    },
    args: {
      label: 'Field Label',
      required: false,
      requiredSymbol: '*',
      requiredSymbolColor: 'red',
      hasRequiredSymbol: true,
    },
  });
</script>

<Story name="Default" args={{ label: 'Email Address' }} />

<Story name="Required" args={{ label: 'Full Name', required: true }} />

<Story name="Custom Symbol" args={{ label: 'Password', required: true, requiredSymbol: '†', requiredSymbolColor: 'orange' }} />

<Story name="No Required Symbol" args={{ label: 'Optional Field', required: true, hasRequiredSymbol: false }} />

<Story name="All Variants">
  {#snippet template()}
    <div class="flex flex-col gap-3">
      <Label label="Basic Label" />
      <Label label="Required Label" required />
      <Label label="Custom Required" required requiredSymbol="!" requiredSymbolColor="blue" />
      <Label label="Hidden Required Symbol" required hasRequiredSymbol={false} />
    </div>
  {/snippet}
</Story>
