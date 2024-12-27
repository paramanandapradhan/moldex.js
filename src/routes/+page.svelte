<script lang="ts">
	import { mdiChevronDown } from '$lib';
	import ButtonDropdown from '$lib/views/core/button/components/button-dropdown/button-dropdown.svelte';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import SearchField from '$lib/views/core/input/components/search-field/search-field.svelte';
</script>

{#snippet dropdown()}
	<div class="p-4">
		<SearchField autofocus />
	</div>
{/snippet}

<div class="min-h-full flex justify-center">
	<ButtonDropdown className="text-nowrap" label="Dropdown" dropdownSnippet={dropdown}>
 
	</ButtonDropdown>
</div>
