<script lang="ts">
	import { showToast } from '$lib/components/toast';
	import { mdiContentCopy } from '$lib/services/icon-service';
	import { copyText } from '$lib/services/utils-service';
	import Icon from '../icon.svelte';

	export let input: string;
	export let btnClass: string = '';
	export let iconSize: string = '16px';
	export let iconColor: string = 'grey';

	function handleCopy() {
		if (input) {
			copyText(input);
			showToast({ message: 'Copied!' });
		}
	}
</script>

<span class="flex-align-center">
	<span>{input || ''}</span>
	{#if input}
		<button class="btn btn-sm p-0 mx-2 {btnClass}" on:click={handleCopy}>
			<Icon path={mdiContentCopy} size={iconSize} color={iconColor} />
		</button>
	{/if}
</span>
