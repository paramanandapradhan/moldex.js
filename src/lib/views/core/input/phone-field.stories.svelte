<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PhoneField from './components/phone-field/phone-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/PhoneField',
    component: PhoneField,
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
      label: { control: 'text' },
      placeholder: { control: 'text' },
      disabled: { control: 'boolean' },
      required: { control: 'boolean' },
    },
    args: {
      label: 'Phone',
      placeholder: 'Enter phone number...',
      appearance: 'normal',
      size: 'md',
      disabled: false,
      required: false,
    },
  });
</script>

<Story name="Default" args={{ label: 'Phone Number', placeholder: '(555) 123-4567' }} />

<Story name="Required" args={{ label: 'Contact Phone', placeholder: 'Enter phone...', required: true }} />

<Story name="Disabled" args={{ label: 'Phone', placeholder: '(555) 123-4567', disabled: true }} />

<Story name="All Appearances">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <PhoneField appearance="normal" label="Normal" placeholder="Phone..." />
      <PhoneField appearance="box" label="Box" placeholder="Phone..." />
      <PhoneField appearance="fill" label="Fill" placeholder="Phone..." />
      <PhoneField appearance="underline" label="Underline" placeholder="Phone..." />
    </div>
  {/snippet}
</Story>
