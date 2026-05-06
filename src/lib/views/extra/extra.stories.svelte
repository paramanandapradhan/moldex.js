<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CountryComboboxField from './fields/country-combobox-field.svelte';
  import StateComboboxField from './fields/state-combobox-field.svelte';
  import CurrencyComboboxField from './fields/currency-combobox-field.svelte';
  import TimezoneComboboxField from './fields/timezone-combobox-field.svelte';
  import DatetimeFormatComboboxField from './fields/datetime-format-combobox-field.svelte';
  import TextCountry from './texts/text-country.svelte';
  import TextCountryState from './texts/text-country-state.svelte';
  import TextCurrency from './texts/text-currency.svelte';
  import TextTimezone from './texts/text-timezone.svelte';
  import TextDatetimeFormat from './texts/text-datetime-format.svelte';

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

<Story name="Currency Combobox">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <CurrencyComboboxField label="Currency" placeholder="Select currency..." appearance="normal" />
    </div>
  {/snippet}
</Story>

<Story name="Currency Combobox (preselected)">
  {#snippet template()}
    <div class="max-w-sm p-4">
      <CurrencyComboboxField label="Currency" placeholder="Select currency..." appearance="normal" value="INR" />
    </div>
  {/snippet}
</Story>

<Story name="TextCurrency">
  {#snippet template()}
    <div class="p-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex gap-4">
        <span class="w-24 font-medium">USD:</span>
        <TextCurrency input="USD" />
      </div>
      <div class="flex gap-4">
        <span class="w-24 font-medium">INR:</span>
        <TextCurrency input="INR" />
      </div>
      <div class="flex gap-4">
        <span class="w-24 font-medium">EUR (symbol only):</span>
        <TextCurrency input="EUR" showCode={false} showName={false} />
      </div>
      <div class="flex gap-4">
        <span class="w-24 font-medium">JPY (name only):</span>
        <TextCurrency input="JPY" showCode={false} showSymbol={false} />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Timezone Combobox">
  {#snippet template()}
    <div class="max-w-md p-4">
      <TimezoneComboboxField label="Timezone" placeholder="Select timezone..." appearance="normal" />
    </div>
  {/snippet}
</Story>

<Story name="Timezone Combobox (preselected)">
  {#snippet template()}
    <div class="max-w-md p-4">
      <TimezoneComboboxField label="Timezone" placeholder="Select timezone..." appearance="normal" value="Asia/Kolkata" />
    </div>
  {/snippet}
</Story>

<Story name="TextTimezone">
  {#snippet template()}
    <div class="p-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex gap-4">
        <span class="w-48 font-medium">Default:</span>
        <TextTimezone input="Asia/Kolkata" />
      </div>
      <div class="flex gap-4">
        <span class="w-48 font-medium">With long name:</span>
        <TextTimezone input="America/Los_Angeles" showLongName={true} />
      </div>
      <div class="flex gap-4">
        <span class="w-48 font-medium">City + offset:</span>
        <TextTimezone input="Europe/London" showCity={true} showName={false} />
      </div>
      <div class="flex gap-4">
        <span class="w-48 font-medium">UTC:</span>
        <TextTimezone input="UTC" showLongName={true} />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="DateTime Format Combobox">
  {#snippet template()}
    <div class="max-w-md p-4">
      <DatetimeFormatComboboxField label="Format" placeholder="Select format..." appearance="normal" />
    </div>
  {/snippet}
</Story>

<Story name="DateTime Format Combobox (date only)">
  {#snippet template()}
    <div class="max-w-md p-4">
      <DatetimeFormatComboboxField label="Date Format" placeholder="Select date format..." appearance="normal" groups={['date']} />
    </div>
  {/snippet}
</Story>

<Story name="DateTime Format Combobox (time only)">
  {#snippet template()}
    <div class="max-w-md p-4">
      <DatetimeFormatComboboxField label="Time Format" placeholder="Select time format..." appearance="normal" groups={['time']} />
    </div>
  {/snippet}
</Story>

<Story name="TextDatetimeFormat">
  {#snippet template()}
    <div class="p-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex gap-4">
        <span class="w-48 font-medium">YYYY-MM-DD:</span>
        <TextDatetimeFormat input="YYYY-MM-DD" />
      </div>
      <div class="flex gap-4">
        <span class="w-48 font-medium">DD/MM/YYYY:</span>
        <TextDatetimeFormat input="DD/MM/YYYY" />
      </div>
      <div class="flex gap-4">
        <span class="w-48 font-medium">MMM DD, YYYY hh:mm A:</span>
        <TextDatetimeFormat input="MMM DD, YYYY hh:mm A" />
      </div>
      <div class="flex gap-4">
        <span class="w-48 font-medium">Preview only:</span>
        <TextDatetimeFormat input="dddd, MMMM DD, YYYY" showFormat={false} />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="All Pickers Together">
  {#snippet template()}
    <div class="max-w-md p-4 space-y-4">
      <CurrencyComboboxField label="Currency" placeholder="Select currency..." appearance="normal" />
      <TimezoneComboboxField label="Timezone" placeholder="Select timezone..." appearance="normal" />
      <DatetimeFormatComboboxField label="Date Format" placeholder="Select format..." appearance="normal" groups={['date']} />
    </div>
  {/snippet}
</Story>
