# Moldex.js — Project Memory

## Project Overview
- **Package**: `@cloudparker/moldex.js` (npm)
- **Stack**: Svelte 5 + Tailwind CSS v4 + SvelteKit
- **Purpose**: Reusable UI component library
- **Root**: `/Users/param/code/crawlink/svelte5/moldex-svelte`

## Key Architecture
- Components live in `src/lib/views/core/<name>/components/<name>/<name>.svelte`
- Each component folder has an `index.ts` that imports and re-exports
- Core index: `src/lib/views/core/index.ts` — must add new component exports here
- Icon paths: `src/lib/views/core/icon/services/icon-path-service.ts` (MDI paths)
- Icon index: `src/lib/views/core/icon/index.ts` — re-exports all icon paths via `export *`

## Theming
- `src/app.css` — Tailwind v4 theme definitions + dark mode
- Primary: purple scale (`--color-primary-50` to `--color-primary-950`)
- Neutral: slate scale (`--color-neutral-50` to `--color-neutral-950`)
- **Dark mode**: `.dark` CSS class on `<html>` (NOT `@theme .dark` — that's invalid in TW v4)
- Semantic aliases: `--color-background`, `--color-foreground`, `--color-primary`, `--color-neutral`

## Storybook
- Config: `.storybook/main.ts` + `.storybook/preview.ts`
- Stories pattern: `../src/**/*.stories.@(js|ts|svelte)`
- `preview.ts` imports `../src/app.css` for Tailwind
- Dark mode toolbar toggle via `globalTypes.theme` in preview.ts
- Stories placed next to components: `src/lib/views/core/<name>/<name>.stories.svelte`

## Components — Complete List
### Existing (pre-session)
Button, ButtonBack, ButtonClose, ButtonCloseIcon, ButtonDropdown, ButtonListItem, ButtonMenu, ButtonOk, ButtonSearch,
Switch, InputField, TextField, EmailField, PasswordField, PhoneField, NumberField, DateField, DateTimeField, TimeField,
CheckboxField, RadioField, RangeField, TextareaField, ComboboxField, ColorField, FileField, SearchField, Label,
Dialog, MsgDialog, TextFieldDialog, TextareaFieldDialog, NumberFieldDialog, DateFieldDialog, DateTimeFieldDialog,
PickerDialog, LoadingDialog, CropperDialog,
TextAwait, TextCopy, TextCurrency, TextDate, TextEmail, TextHtml, TextPhone,
Navbar, Sidebar, Drawer, Icon, IconCircle, Spinner, Toast, Progressbar, Pagination, NoData, VerticalRuler,
ContentArea, VirtualScrollingList, ScreenDetector

### Added in this session
Alert, Badge, Card, Avatar, Tabs, Accordion, Tooltip, Breadcrumb, Divider

## Known Fixes Applied
- `@theme .dark {}` → `.dark {}` in app.css (Tailwind v4 fix)
- Progressbar: `bg-indigo-600` → `bg-primary`, `bg-gray-200` → `bg-neutral-200 dark:bg-neutral-700`
- NoData: `text-gray-500` → `text-neutral-500 dark:text-neutral-400`
- Toast: renamed `closeClose()` → `closeToast()` (old name kept as deprecated alias); fixed dark colors
- Drawer: removed duplicate flex-row / flex-row-reverse bug for `position === 'right'`
- Dialog: backdrop `bg-gray-500/20` → `bg-neutral-500/20`, subtitle `text-gray-500` → `text-neutral-500 dark:text-neutral-400`
- IconCircle: added `dark:bg-primary-900/30` for dark mode
- InputField floating label: fixed hardcoded `bg-white` → `bg-white dark:bg-neutral-800`
- Added icons to icon-path-service: mdiInformation, mdiAlert, mdiAlertCircle, mdiChevronUp, mdiAccount, mdiAccountCircle, mdiHome, mdiTag
- RadioField: `text-gray-900/500/600` → neutral with dark variants
- LoadingDialog: `text-gray-400` → `text-neutral-500 dark:text-neutral-400`
- FileField button: `hover:bg-gray-100` → `hover:bg-neutral-100 dark:hover:bg-neutral-700`
- SearchField icon: `text-gray-400` → `text-neutral-400 dark:text-neutral-500`
- TextCopy/TextEmail/TextPhone: `text-gray-500 hover:bg-gray-100` → neutral with dark variants

## Input Field Appearance Values (IMPORTANT)
Valid values: `'normal'` | `'box'` | `'fill'` | `'underline'` | `'fill-underline'` | `'none'`
NOT: 'outline', 'filled' (those are incorrect)

## Stories Created (Session 3)
- `input/checkbox-field.stories.svelte`
- `input/radio-field.stories.svelte`
- `input/range-field.stories.svelte`
- `input/password-field.stories.svelte`
- `input/date-field.stories.svelte`
- `input/datetime-field.stories.svelte`
- `input/time-field.stories.svelte`
- `input/color-field.stories.svelte`
- `input/file-field.stories.svelte`
- `input/search-field.stories.svelte`
- `input/combobox-field.stories.svelte`
- `text/text.stories.svelte` (TextCopy, TextDate, TextCurrency, TextEmail, TextPhone, TextHtml, TextAwait)
- `button/button-menu.stories.svelte` (ButtonMenu, ButtonListItem, ButtonDropdown)
- `dialog/dialog.stories.svelte` (updated, fixed invalid `<script>` inside snippets)
- `dialog/dialog-service.stories.svelte` (all DialogService functions)

## Documentation MDX Files
- `src/stories/Introduction.mdx` — library overview
- `src/stories/Inputs.mdx` — all input components
- `src/stories/Dialogs.mdx` — Dialog component + DialogService API

## User Preferences
- No emojis unless requested
- Concise responses
- Svelte 5 runes syntax only ($state, $derived, $props, $effect)
