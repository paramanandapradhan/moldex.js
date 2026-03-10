<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Icon from './components/icon/icon.svelte';
  import IconCircle from './components/icon-circle/icon-circle.svelte';
  import {
    mdiAccount, mdiHome, mdiMagnify, mdiClose, mdiMenu,
    mdiChevronRight, mdiChevronDown, mdiCheckCircle, mdiAlert,
    mdiInformation, mdiAlertCircle, mdiArrowLeft, mdiTag,
    mdiEmailOutline, mdiPhone, mdiContentCopy, mdiBellOutline,
    mdiAttachment, mdiOpenInNew, mdiDotsHorizontal
  } from './index.js';

  const icons = [
    { name: 'mdiAccount', path: mdiAccount },
    { name: 'mdiHome', path: mdiHome },
    { name: 'mdiMagnify', path: mdiMagnify },
    { name: 'mdiClose', path: mdiClose },
    { name: 'mdiMenu', path: mdiMenu },
    { name: 'mdiChevronRight', path: mdiChevronRight },
    { name: 'mdiChevronDown', path: mdiChevronDown },
    { name: 'mdiCheckCircle', path: mdiCheckCircle },
    { name: 'mdiAlert', path: mdiAlert },
    { name: 'mdiInformation', path: mdiInformation },
    { name: 'mdiAlertCircle', path: mdiAlertCircle },
    { name: 'mdiArrowLeft', path: mdiArrowLeft },
    { name: 'mdiTag', path: mdiTag },
    { name: 'mdiEmailOutline', path: mdiEmailOutline },
    { name: 'mdiPhone', path: mdiPhone },
    { name: 'mdiContentCopy', path: mdiContentCopy },
    { name: 'mdiBellOutline', path: mdiBellOutline },
    { name: 'mdiAttachment', path: mdiAttachment },
    { name: 'mdiOpenInNew', path: mdiOpenInNew },
    { name: 'mdiDotsHorizontal', path: mdiDotsHorizontal },
  ];

  const { Story } = defineMeta({
    title: 'Core/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
      path: { control: 'text', description: 'SVG path data (MDI path string)' },
      sizeClassName: { control: 'text', description: 'Tailwind size classes, e.g. w-6 h-6' },
    },
    args: {
      path: mdiAccount,
      sizeClassName: 'w-6 h-6',
    },
  });
</script>

<Story name="Default" args={{ path: mdiAccount, sizeClassName: 'w-6 h-6' }} />

<Story name="Sizes">
  {#snippet template()}
    <div class="flex items-end gap-6">
      <Icon path={mdiAccount} sizeClassName="w-4 h-4 text-neutral-500" />
      <Icon path={mdiAccount} sizeClassName="w-5 h-5 text-neutral-500" />
      <Icon path={mdiAccount} sizeClassName="w-6 h-6 text-neutral-500" />
      <Icon path={mdiAccount} sizeClassName="w-8 h-8 text-neutral-500" />
      <Icon path={mdiAccount} sizeClassName="w-10 h-10 text-neutral-500" />
      <Icon path={mdiAccount} sizeClassName="w-14 h-14 text-neutral-500" />
    </div>
  {/snippet}
</Story>

<Story name="Colors">
  {#snippet template()}
    <div class="flex items-center gap-4 flex-wrap">
      <Icon path={mdiCheckCircle} sizeClassName="w-8 h-8" className="text-primary" />
      <Icon path={mdiAlert} sizeClassName="w-8 h-8" className="text-yellow-500" />
      <Icon path={mdiAlertCircle} sizeClassName="w-8 h-8" className="text-red-500" />
      <Icon path={mdiInformation} sizeClassName="w-8 h-8" className="text-sky-500" />
      <Icon path={mdiCheckCircle} sizeClassName="w-8 h-8" className="text-green-500" />
    </div>
  {/snippet}
</Story>

<Story name="Icon Gallery">
  {#snippet template()}
    <div class="grid grid-cols-4 sm:grid-cols-6 gap-4 p-4">
      {#each icons as { name, path }}
        <div class="flex flex-col items-center gap-2 p-3 rounded-lg border border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">
          <Icon {path} sizeClassName="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
          <span class="text-xs text-neutral-500 text-center leading-tight">{name.replace('mdi', '')}</span>
        </div>
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="IconCircle">
  {#snippet template()}
    <div class="flex items-center gap-4 flex-wrap">
      <IconCircle iconPath={mdiAccount} />
      <IconCircle iconPath={mdiHome} />
      <IconCircle iconPath={mdiMagnify} />
      <IconCircle iconPath={mdiCheckCircle} />
      <IconCircle iconPath={mdiBellOutline} />
    </div>
  {/snippet}
</Story>
