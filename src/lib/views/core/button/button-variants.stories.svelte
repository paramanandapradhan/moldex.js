<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ButtonBack from './components/button-back/button-back.svelte';
  import ButtonHome from './components/button-home/button-home.svelte';
  import ButtonCloseIcon from './components/button-close-icon/button-close-icon.svelte';
  import ButtonClose from './components/button-close/button-close.svelte';
  import ButtonOk from './components/button-ok/button-ok.svelte';
  import ButtonSearch from './components/button-search/button-search.svelte';
  import ButtonDropdown from './components/button-dropdown/button-dropdown.svelte';
  import Button from './components/button/button.svelte';

  const { Story } = defineMeta({
    title: 'Core/Button/ButtonVariants',
    component: ButtonBack,
    tags: ['autodocs'],
  });
</script>

<Story name="ButtonBack">
  {#snippet template()}
    <div class="p-4 flex items-center gap-4">
      <ButtonBack onClick={() => console.log('Back clicked')} />
      <span class="text-sm text-neutral-500">Back navigation button</span>
    </div>
  {/snippet}
</Story>

<Story name="ButtonHome">
  {#snippet template()}
    <div class="p-4 flex items-center gap-4">
      <ButtonHome onClick={() => console.log('Home clicked')} />
      <span class="text-sm text-neutral-500">Home navigation button</span>
    </div>
  {/snippet}
</Story>

<Story name="ButtonCloseIcon">
  {#snippet template()}
    <div class="p-4 flex items-center gap-4">
      <ButtonCloseIcon onClick={() => console.log('Close clicked')} />
      <span class="text-sm text-neutral-500">Close icon button (round)</span>
    </div>
  {/snippet}
</Story>

<Story name="ButtonClose">
  {#snippet template()}
    <div class="p-4 flex items-center gap-4">
      <ButtonClose label="Close" className="!p-2 !px-4" onClick={() => console.log('Close clicked')} />
      <span class="text-sm text-neutral-500">Close button (styled)</span>
    </div>
  {/snippet}
</Story>

<Story name="ButtonOk">
  {#snippet template()}
    <div class="p-4 flex items-center gap-4">
      <ButtonOk label="OK" onClick={() => console.log('OK clicked')} />
      <ButtonOk label="Save" onClick={() => console.log('Save clicked')} />
      <ButtonOk label="Confirm" onClick={() => console.log('Confirm clicked')} />
    </div>
  {/snippet}
</Story>

<Story name="ButtonSearch">
  {#snippet template()}
    <div class="p-4">
      <ButtonSearch placeholder="Search..." onSearch={(text) => console.log('Search:', text)} />
    </div>
  {/snippet}
</Story>

<Story name="ButtonDropdown">
  {#snippet template()}
    <div class="p-8 flex justify-center">
      <ButtonDropdown appearance="border" label="Options">
        {#snippet dropdownSnippet()}
          <div class="p-4 min-w-[200px]">
            <p class="text-sm text-neutral-700 dark:text-neutral-300 font-medium mb-2">Dropdown Content</p>
            <Button appearance="none" size="sm" label="Option 1" className="w-full text-left" />
            <Button appearance="none" size="sm" label="Option 2" className="w-full text-left" />
            <Button appearance="none" size="sm" label="Option 3" className="w-full text-left" />
          </div>
        {/snippet}
      </ButtonDropdown>
    </div>
  {/snippet}
</Story>

<Story name="All Navigation Buttons">
  {#snippet template()}
    <div class="p-4 flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
      <ButtonBack onClick={() => console.log('Back')} />
      <ButtonHome onClick={() => console.log('Home')} />
      <ButtonCloseIcon onClick={() => console.log('Close')} />
    </div>
  {/snippet}
</Story>
