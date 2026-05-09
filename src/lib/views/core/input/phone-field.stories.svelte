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

<Story name="All Sizes">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <PhoneField size="xs" label="xs" placeholder="Phone..." />
      <PhoneField size="sm" label="sm" placeholder="Phone..." />
      <PhoneField size="md" label="md" placeholder="Phone..." />
      <PhoneField size="lg" label="lg" placeholder="Phone..." />
    </div>
  {/snippet}
</Story>

<Story name="Paste Demo">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <p class="text-sm text-neutral-600">Try pasting any of these into the field below:</p>
      <ul class="text-xs space-y-1 text-neutral-500">
        <li><code>+1 (555) 123-4567</code></li>
        <li><code>00 44 20 7946 0958</code></li>
        <li><code>+91-98765 43210</code></li>
        <li><code>(555) 123.4567</code></li>
        <li><code>+33 1 23 45 67 89</code></li>
      </ul>
      <PhoneField label="Phone" placeholder="Paste here..." />
    </div>
  {/snippet}
</Story>

<Story name="Prefilled From Different Countries">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <PhoneField label="US" value="+15551234567" />
      <PhoneField label="UK" value="+442079460958" />
      <PhoneField label="India" value="+919876543210" />
      <PhoneField label="France" value="+33123456789" />
    </div>
  {/snippet}
</Story>
