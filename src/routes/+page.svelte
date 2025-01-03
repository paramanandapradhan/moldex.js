<script lang="ts">
	import { mdiArrowLeft } from '$lib';
	import ButtonListItem from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';
	import Loading from '$lib/views/core/common/components/loading/loading.svelte';
	import IconCircle from '$lib/views/core/icon/components/icon-circle/icon-circle.svelte';
</script>

<div class="min-h-full">
	<div>
		{#each ['Parama', 'Taps', 'Ansh', 'Jhilly', 'Silly', 'Tubulu'] as item}
			<ButtonListItem title={item} hasDivider dividerClassName="ms-24" />
		{/each}
	</div>
</div>
