<script lang="ts">
	import { mdiPhone } from '$lib/services/icon-service';
	import Icon from '../icon.svelte';

	export let input: string;
	export let btnClass: string = '';
	export let iconSize: string = '16px';
	export let iconColor: string = 'grey';
</script>

<span class="flex-align-center">
	<span>{input || ''}</span>
	{#if input}
		<a class="btn btn-sm p-0 mx-2 {btnClass}" href="tel:{input}">
			<Icon path={mdiPhone} size={iconSize} color={iconColor} />
		</a>
	{/if}
</span>
