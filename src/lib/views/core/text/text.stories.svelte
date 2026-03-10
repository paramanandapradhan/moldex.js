<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TextCopy from './components/text-copy/text-copy.svelte';
  import TextDate from './components/text-date/text-date.svelte';
  import TextCurrency from './components/text-currency/text-currency.svelte';
  import TextEmail from './components/text-email/text-email.svelte';
  import TextPhone from './components/text-phone/text-phone.svelte';
  import TextHtml from './components/text-html/text-html.svelte';
  import TextAwait from './components/text-await/text-await.svelte';

  const { Story } = defineMeta({
    title: 'Core/Text',
    component: TextCopy,
    tags: ['autodocs'],
  });
</script>

<Story name="TextCopy">
  {#snippet template()}
    <div class="p-4 space-y-3">
      <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
        <span class="font-medium w-32">API Key:</span>
        <TextCopy input="sk-abc123def456ghi789" />
      </div>
      <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
        <span class="font-medium w-32">Invite URL:</span>
        <TextCopy input="https://app.example.com/invite/xyz" />
      </div>
      <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
        <span class="font-medium w-32">Token:</span>
        <TextCopy input="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="TextDate">
  {#snippet template()}
    <div class="p-4 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Default format:</span>
        <TextDate input={new Date()} />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Short date:</span>
        <TextDate input={new Date()} format="DD MMM YYYY" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Time only:</span>
        <TextDate input={new Date()} format="hh:mm a" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Relative (ago):</span>
        <TextDate input={new Date(Date.now() - 3600000 * 2)} format="ago" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="TextCurrency">
  {#snippet template()}
    <div class="p-4 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">USD:</span>
        <TextCurrency input={1299.99} symbol="$" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">EUR:</span>
        <TextCurrency input={850.5} symbol="€" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">No symbol:</span>
        <TextCurrency input={5000} hasSymbol={false} />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Negative (empty):</span>
        <TextCurrency input={-100} empty="N/A" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">4 decimals:</span>
        <TextCurrency input={3.14159} decimal={4} />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="TextEmail">
  {#snippet template()}
    <div class="p-4 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Email link:</span>
        <TextEmail input="hello@example.com" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Support email:</span>
        <TextEmail input="support@moldex.js" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="TextPhone">
  {#snippet template()}
    <div class="p-4 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Phone link:</span>
        <TextPhone input="+1 (555) 123-4567" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Mobile:</span>
        <TextPhone input="+44 7700 900123" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="TextHtml">
  {#snippet template()}
    <div class="p-4 space-y-4 text-sm text-neutral-700 dark:text-neutral-300 max-w-md">
      <TextHtml input="<p>This is a <strong>bold</strong> paragraph with <em>italic</em> text.</p>" />
      <TextHtml input="<ul><li>Item one</li><li>Item two</li><li>Item three</li></ul>" />
      <TextHtml input='<p>Visit our <a href="#" class="text-primary underline">documentation</a> for more info.</p>' />
    </div>
  {/snippet}
</Story>

<Story name="TextAwait">
  {#snippet template()}
    <div class="p-4 space-y-4 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Resolved:</span>
        <TextAwait input={Promise.resolve('Fetched successfully!')} placeholder="Loading..." />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Object key:</span>
        <TextAwait input={Promise.resolve({ name: 'John Doe' })} key="name" placeholder="Loading..." />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-40 font-medium">Empty result:</span>
        <TextAwait input={Promise.resolve(null)} emptyText="No data found" />
      </div>
    </div>
  {/snippet}
</Story>
