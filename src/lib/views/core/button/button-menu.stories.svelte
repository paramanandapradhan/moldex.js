<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ButtonMenu from './components/button-menu/button-menu.svelte';
  import ButtonListItem from './components/button-list-item/button-list-item.svelte';
  import ButtonDropdown from './components/button-dropdown/button-dropdown.svelte';
  import { mdiAccount, mdiHome, mdiMagnify, mdiClose, mdiTag, mdiEmailOutline, mdiPhone } from '../icon/index.js';

  const { Story } = defineMeta({
    title: 'Core/Button/ButtonMenu',
    component: ButtonMenu,
    tags: ['autodocs'],
  });
</script>

<Story name="ButtonMenu Simple">
  {#snippet template()}
    <div class="p-8 flex justify-center">
      <ButtonMenu
        menus={['Edit', 'Duplicate', 'Archive', 'Delete']}
        onMenu={(ev, menu) => console.log('Menu clicked:', menu)}
      />
    </div>
  {/snippet}
</Story>

<Story name="ButtonMenu With Icons">
  {#snippet template()}
    <div class="p-8 flex justify-center">
      <ButtonMenu
        menus={[
          { _id: 'edit', title: 'Edit', iconPath: mdiAccount },
          { _id: 'copy', title: 'Duplicate', iconPath: mdiHome },
          { _id: 'divider', title: '-' },
          { _id: 'delete', title: 'Delete', iconPath: mdiClose },
        ]}
        onMenu={(ev, menu) => console.log('Menu clicked:', menu)}
      />
    </div>
  {/snippet}
</Story>

<Story name="ButtonMenu With Label">
  {#snippet template()}
    <div class="p-8 flex justify-center">
      <ButtonMenu
        label="Actions"
        appearance="primary"
        menus={['View', 'Edit', 'Share', 'Delete']}
        onMenu={(ev, menu) => console.log('Menu:', menu)}
      />
    </div>
  {/snippet}
</Story>

<Story name="ButtonListItem Basic">
  {#snippet template()}
    <div class="max-w-xs border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <ButtonListItem title="John Doe" subtitle="john@example.com" />
      <ButtonListItem title="Jane Smith" subtitle="jane@example.com" hasDivider />
      <ButtonListItem title="Bob Johnson" subtitle="bob@example.com" hasDivider />
    </div>
  {/snippet}
</Story>

<Story name="ButtonListItem With Icons">
  {#snippet template()}
    <div class="max-w-xs border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <ButtonListItem
        hasIcon
        iconPath={mdiAccount}
        title="Profile"
        subtitle="Manage your account"
        hasArrow
        hasDivider
      />
      <ButtonListItem
        hasIcon
        iconPath={mdiEmailOutline}
        title="Messages"
        subtitle="3 unread messages"
        hasArrow
        hasDivider
      />
      <ButtonListItem
        hasIcon
        iconPath={mdiPhone}
        title="Calls"
        subtitle="Recent call history"
        hasArrow
      />
    </div>
  {/snippet}
</Story>

<Story name="ButtonListItem With Circular Icons">
  {#snippet template()}
    <div class="max-w-xs border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <ButtonListItem
        hasIcon
        isCircularIcon
        iconPath={mdiAccount}
        title="Alice Wonderland"
        subtitle="Frontend Developer"
        hasArrow
        hasDivider
      />
      <ButtonListItem
        hasIcon
        isCircularIcon
        iconPath={mdiHome}
        title="Bob Builder"
        subtitle="Backend Engineer"
        hasArrow
        hasDivider
      />
      <ButtonListItem
        hasIcon
        isCircularIcon
        iconPath={mdiTag}
        title="Charlie Brown"
        subtitle="Product Manager"
        hasArrow
      />
    </div>
  {/snippet}
</Story>

<Story name="ButtonListItem With Checkbox">
  {#snippet template()}
    <div class="max-w-xs border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <ButtonListItem title="Option Alpha" hasCheckbox isChecked={true} hasDivider />
      <ButtonListItem title="Option Beta" hasCheckbox isChecked={false} hasDivider />
      <ButtonListItem title="Option Gamma" hasCheckbox isChecked={true} />
    </div>
  {/snippet}
</Story>

<Story name="ButtonListItem With Menu">
  {#snippet template()}
    <div class="max-w-xs border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <ButtonListItem
        title="Project Alpha"
        subtitle="Last modified 2 hours ago"
        hasMenu
        menus={['Open', 'Rename', 'Delete']}
        hasDivider
      />
      <ButtonListItem
        title="Project Beta"
        subtitle="Last modified yesterday"
        hasMenu
        menus={['Open', 'Rename', 'Delete']}
      />
    </div>
  {/snippet}
</Story>

<Story name="ButtonDropdown Custom">
  {#snippet template()}
    <div class="p-8 flex justify-center">
      <ButtonDropdown label="Options" appearance="border">
        {#snippet dropdownSnippet()}
          <div class="py-2 min-w-48">
            <div class="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Account</div>
            <button class="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              Profile Settings
            </button>
            <button class="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              Notifications
            </button>
            <hr class="my-1 border-neutral-200 dark:border-neutral-700" />
            <button class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
              Sign Out
            </button>
          </div>
        {/snippet}
      </ButtonDropdown>
    </div>
  {/snippet}
</Story>
