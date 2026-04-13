<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CountryComboboxField from './fields/country-combobox-field.svelte';
  import StateComboboxField from './fields/state-combobox-field.svelte';
  import TextCountry from './texts/text-country.svelte';
  import TextCountryState from './texts/text-country-state.svelte';

  const { Story } = defineMeta({
    title: 'Extra/CountryState',
    component: CountryComboboxField,
    tags: ['autodocs'],
  });
</script>

<Story name="Country Combobox">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <CountryComboboxField label="Country" placeholder="Select country..." appearance="normal" />
    </div>
  {/snippet}
</Story>

<Story name="State Combobox">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <StateComboboxField label="State" placeholder="Select state..." appearance="normal" countryCode="US" />
    </div>
  {/snippet}
</Story>

<Story name="Country and State Together">
  {#snippet template()}
    <div class="max-w-sm p-4 space-y-4">
      <CountryComboboxField label="Country" placeholder="Select country..." appearance="normal" />
      <StateComboboxField label="State / Province" placeholder="Select state..." appearance="normal" countryCode="US" />
    </div>
  {/snippet}
</Story>

<Story name="TextCountry">
  {#snippet template()}
    <div class="p-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex gap-4">
        <span class="w-24 font-medium">US:</span>
        <TextCountry input="US" />
      </div>
      <div class="flex gap-4">
        <span class="w-24 font-medium">IN:</span>
        <TextCountry input="IN" />
      </div>
      <div class="flex gap-4">
        <span class="w-24 font-medium">GB:</span>
        <TextCountry input="GB" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="TextCountryState">
  {#snippet template()}
    <div class="p-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex gap-4">
        <span class="w-32 font-medium">State display:</span>
        <TextCountryState input="US-CA" />
      </div>
    </div>
  {/snippet}
</Story>
