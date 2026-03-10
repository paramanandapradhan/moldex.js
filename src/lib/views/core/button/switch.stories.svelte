<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Switch from './components/switch/switch.svelte';

  const { Story } = defineMeta({
    title: 'Core/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
      size: {
        control: { type: 'select' },
        options: ['sm', 'md', 'lg'],
        description: 'Size of the switch',
      },
      checked: { control: 'boolean', description: 'Current toggle state' },
      disabled: { control: 'boolean' },
    },
    args: {
      checked: false,
      size: 'md',
      disabled: false,
    },
  });
</script>

<Story name="Default" args={{ checked: false }} />

<Story name="Checked" args={{ checked: true }} />

<Story name="Disabled Off" args={{ checked: false, disabled: true }} />

<Story name="Disabled On" args={{ checked: true, disabled: true }} />

<Story name="All Sizes">
  {#snippet template()}
    <div class="flex items-center gap-6">
      <div class="flex flex-col items-center gap-2">
        <Switch size="sm" checked={true} />
        <span class="text-xs text-neutral-500">Small</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Switch size="md" checked={true} />
        <span class="text-xs text-neutral-500">Medium</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Switch size="lg" checked={true} />
        <span class="text-xs text-neutral-500">Large</span>
      </div>
    </div>
  {/snippet}
</Story>
