<script lang="ts">
	import { mdiEmailOutline } from "$lib/services/icon-service";
	import { dataUrlToFile } from "$lib/services/utils-service";
	import Icon from "../icon.svelte";


	export let input: string;
	export let btnClass: string = '';
	export let iconSize: string = '16px';
	export let iconColor: string = 'grey';
</script>

<span>{input || ''}</span>
{#if input}
	<a class="btn btn-sm p-0 mx-2 {btnClass}" href="mailto:{dataUrlToFile}">
		<Icon path={mdiEmailOutline} size={iconSize} color={iconColor} />
	</a>
{/if}
