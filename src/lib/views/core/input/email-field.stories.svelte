<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import EmailField from './components/email-field/email-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/EmailField',
    component: EmailField,
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
      label: 'Email',
      placeholder: 'Enter email address...',
      appearance: 'normal',
      size: 'md',
      disabled: false,
      required: false,
    },
  });
</script>

<Story name="Default" args={{ label: 'Email', placeholder: 'user@example.com' }} />

<Story name="Required" args={{ label: 'Work Email', placeholder: 'name@company.com', required: true }} />

<Story name="Disabled" args={{ label: 'Email', placeholder: 'user@example.com', disabled: true }} />

<Story name="All Appearances">
  {#snippet template()}
    <div class="flex flex-col gap-4 max-w-sm">
      <EmailField appearance="normal" label="Normal" placeholder="user@example.com" />
      <EmailField appearance="box" label="Box" placeholder="user@example.com" />
      <EmailField appearance="fill" label="Fill" placeholder="user@example.com" />
      <EmailField appearance="underline" label="Underline" placeholder="user@example.com" />
      <EmailField appearance="fill-underline" label="Fill Underline" placeholder="user@example.com" />
    </div>
  {/snippet}
</Story>
