<script lang="ts">
	import ButtonDropdown from '$lib/views/core/button/components/button-dropdown/button-dropdown.svelte';
</script>

{#snippet dropdown()}
	<div class="p-6">
		<h1>My Dropdown</h1>
	</div>
{/snippet}

<div class="min-h-full">
	sdsd
	<ButtonDropdown className="text-nowrap" label="Dropdown" dropdownSnippet={dropdown}
		>this is my dropdown</ButtonDropdown
	>
</div>
