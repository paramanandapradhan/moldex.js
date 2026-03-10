<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Navbar from './components/navbar/navbar.svelte';
  import Button from '../button/components/button/button.svelte';
  import { mdiAccount, mdiMagnify } from '../icon/index.js';

  const { Story } = defineMeta({
    title: 'Core/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      subtitle: { control: 'text' },
      hasTitle: { control: 'boolean' },
      hasSubtitle: { control: 'boolean' },
      hasBack: { control: 'boolean' },
      hasLogo: { control: 'boolean' },
      hasMore: { control: 'boolean' },
    },
    args: {
      title: 'Page Title',
      subtitle: 'Subtitle',
      hasTitle: true,
      hasSubtitle: false,
      hasBack: false,
      hasLogo: false,
      hasMore: false,
    },
  });
</script>

<Story name="Title Only" args={{ hasTitle: true, title: 'My Application' }} />

<Story name="Title and Subtitle" args={{ hasTitle: true, hasSubtitle: true, title: 'Dashboard', subtitle: 'Welcome back!' }} />

<Story name="With Back Button" args={{ hasTitle: true, title: 'Detail Page', hasBack: true }} />

<Story name="With More Menu" args={{ hasTitle: true, title: 'App Name', hasMore: true, morePosition: 'left' }} />

<Story name="With Actions">
  {#snippet template()}
    <Navbar hasTitle title="App">
      {#snippet rightSnippet()}
        <div class="flex items-center gap-2 h-full px-2">
          <Button appearance="none" iconPath={mdiMagnify} />
          <Button appearance="none" iconPath={mdiAccount} />
        </div>
      {/snippet}
    </Navbar>
  {/snippet}
</Story>

<Story name="With Logo Image">
  {#snippet template()}
    <Navbar hasLogo hasTitle title="Moldex" logoImgSrc="https://placehold.co/32x32/7f22fe/white?text=M" />
  {/snippet}
</Story>
