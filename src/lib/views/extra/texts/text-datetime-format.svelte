<script lang="ts">
	import moment from 'moment';

	type Props = {
		input?: string | null;
		date?: Date | string | number;
		showFormat?: boolean;
		showPreview?: boolean;
		separator?: string;
	};

	let {
		input,
		date = new Date(),
		showFormat = true,
		showPreview = true,
		separator = ' → '
	}: Props = $props();

	let preview = $derived(input ? moment(date).format(input) : '');
</script>

{#if input}
	<span>
		{#if showFormat}{input}{/if}
		{#if showFormat && showPreview}{separator}{/if}
		{#if showPreview}{preview}{/if}
	</span>
{/if}
