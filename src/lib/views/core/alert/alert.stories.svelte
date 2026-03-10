<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Alert from './components/alert/alert.svelte';

  const { Story } = defineMeta({
    title: 'Core/Alert',
    component: Alert,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['info', 'success', 'warning', 'error'],
        description: 'Visual style/severity of the alert',
      },
      title: { control: 'text' },
      message: { control: 'text' },
      dismissible: { control: 'boolean', description: 'Show a dismiss (×) button' },
    },
    args: {
      variant: 'info',
      title: '',
      message: 'This is an informational message.',
      dismissible: false,
    },
  });
</script>

<Story name="Info" args={{ variant: 'info', message: 'This is an informational message.' }} />
<Story name="Success" args={{ variant: 'success', message: 'Your changes have been saved successfully.' }} />
<Story name="Warning" args={{ variant: 'warning', message: 'Please review your input before continuing.' }} />
<Story name="Error" args={{ variant: 'error', message: 'Something went wrong. Please try again.' }} />

<Story name="With Title" args={{ variant: 'success', title: 'Saved!', message: 'Your changes have been saved to the server.' }} />

<Story name="Dismissible" args={{ variant: 'info', title: 'New Feature', message: 'Check out the new dashboard features.', dismissible: true }} />

<Story name="All Variants">
  {#snippet template()}
    <div class="flex flex-col gap-3 max-w-lg">
      <Alert variant="info" message="Information — something you should know." />
      <Alert variant="success" title="Success" message="Operation completed successfully." />
      <Alert variant="warning" message="Warning — please review before proceeding." />
      <Alert variant="error" title="Error" message="An error occurred. Please try again." dismissible />
    </div>
  {/snippet}
</Story>
