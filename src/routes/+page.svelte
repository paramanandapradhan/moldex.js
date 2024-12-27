<script lang="ts">
	import ButtonSearch from '$lib/views/core/button/components/button-search/button-search.svelte';
</script>

<div class="min-h-full flex justify-center">
	<ButtonSearch
		appearance="border-base"
		searchAppearance="fill"
		onSearch={(txt) => console.log(txt)}
	/>
</div>
