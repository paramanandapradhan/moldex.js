<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Toast from './components/toast/toast.svelte';
  import Button from '../button/components/button/button.svelte';

  const { Story } = defineMeta({
    title: 'Core/Toast',
    component: Toast,
    tags: ['autodocs'],
    argTypes: {
      msg: { control: 'text', description: 'Toast message (HTML supported)' },
      duration: { control: { type: 'number', min: 500, step: 500 }, description: 'Auto-dismiss duration in ms' },
    },
    args: {
      msg: 'Operation completed successfully!',
      duration: 3000,
    },
  });
</script>

<Story name="Default">
  {#snippet template()}
    <div class="relative min-h-[160px] flex items-center justify-center">
      <script>
        let toastRef;
      </script>
      <Button appearance="primary" label="Show Toast" onClick={() => toastRef?.openToast()} />
      <Toast bind:this={toastRef} msg="Operation completed!" duration={3000} />
    </div>
  {/snippet}
</Story>

<Story name="Long Message">
  {#snippet template()}
    <div class="relative min-h-[160px] flex items-center justify-center">
      <script>
        let toastRef2;
      </script>
      <Button appearance="neutral" label="Show Toast" onClick={() => toastRef2?.openToast()} />
      <Toast bind:this={toastRef2} msg="Your changes have been saved successfully. You can continue editing." duration={4000} />
    </div>
  {/snippet}
</Story>
