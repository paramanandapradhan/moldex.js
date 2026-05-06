<script lang="ts">
	import { loadTimezones } from '$lib/views/extra/loaders/timezone-loader.svelte';
	import type { Timezone } from '../types';

	type Props = {
		input?: string | null;
		showOffset?: boolean;
		showName?: boolean;
		showLongName?: boolean;
		showCity?: boolean;
	};

	let {
		input,
		showOffset = true,
		showName = true,
		showLongName = false,
		showCity = false
	}: Props = $props();

	let timezones: Timezone[] = $state([]);

	$effect(() => {
		if (!timezones.length) timezones = loadTimezones();
	});

	let tz = $derived(input ? timezones.find((t) => t.name === input) : undefined);
</script>

{#if tz}
	<span>
		{#if showOffset}({tz.offset}){/if}
		{#if showCity}{tz.city}{/if}
		{#if showName}{tz.name}{/if}
		{#if showLongName && tz.longName}— {tz.longName}{/if}
	</span>
{/if}
