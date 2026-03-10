<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PasswordField from './components/password-field/password-field.svelte';

  const { Story } = defineMeta({
    title: 'Core/Input/PasswordField',
    component: PasswordField,
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
    },
    args: {
      placeholder: 'Enter password',
      appearance: 'normal',
    },
  });
</script>

<Story name="Default">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <PasswordField name="password" label="Password" placeholder="Enter your password" />
    </div>
  {/snippet}
</Story>

<Story name="Appearances">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <PasswordField name="p1" label="Normal" placeholder="Normal" appearance="normal" />
      <PasswordField name="p2" label="Box" placeholder="Box" appearance="box" />
      <PasswordField name="p3" label="Fill" placeholder="Fill" appearance="fill" />
      <PasswordField name="p4" label="Underline" placeholder="Underline" appearance="underline" />
      <PasswordField name="p5" label="Fill Underline" placeholder="Fill Underline" appearance="fill-underline" />
    </div>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <PasswordField name="pxs" label="XS" placeholder="Extra small" size="xs" />
      <PasswordField name="psm" label="SM" placeholder="Small" size="sm" />
      <PasswordField name="pmd" label="MD" placeholder="Medium" size="md" />
      <PasswordField name="plg" label="LG" placeholder="Large" size="lg" />
    </div>
  {/snippet}
</Story>
