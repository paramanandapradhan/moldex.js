<script lang="ts" module>
	import type { DateTimeFormat } from '../types';

	export const DATE_FORMATS: DateTimeFormat[] = [
		{ format: 'YYYY-MM-DD', group: 'date' },
		{ format: 'YYYY/MM/DD', group: 'date' },
		{ format: 'YYYY.MM.DD', group: 'date' },
		{ format: 'DD-MM-YYYY', group: 'date' },
		{ format: 'DD/MM/YYYY', group: 'date' },
		{ format: 'DD.MM.YYYY', group: 'date' },
		{ format: 'MM-DD-YYYY', group: 'date' },
		{ format: 'MM/DD/YYYY', group: 'date' },
		{ format: 'MM.DD.YYYY', group: 'date' },
		{ format: 'DD MMM YYYY', group: 'date' },
		{ format: 'DD MMMM YYYY', group: 'date' },
		{ format: 'MMM DD, YYYY', group: 'date' },
		{ format: 'MMMM DD, YYYY', group: 'date' },
		{ format: 'ddd, MMM DD, YYYY', group: 'date' },
		{ format: 'dddd, MMMM DD, YYYY', group: 'date' },
		{ format: 'YY-MM-DD', group: 'date' },
		{ format: 'DD/MM/YY', group: 'date' },
		{ format: 'MM/DD/YY', group: 'date' }
	];

	export const TIME_FORMATS: DateTimeFormat[] = [
		{ format: 'HH:mm', group: 'time' },
		{ format: 'HH:mm:ss', group: 'time' },
		{ format: 'hh:mm A', group: 'time' },
		{ format: 'hh:mm a', group: 'time' },
		{ format: 'hh:mm:ss A', group: 'time' },
		{ format: 'hh:mm:ss a', group: 'time' },
		{ format: 'h:mm A', group: 'time' },
		{ format: 'h:mm a', group: 'time' }
	];

	export const DATETIME_FORMATS: DateTimeFormat[] = [
		{ format: 'YYYY-MM-DD HH:mm', group: 'datetime' },
		{ format: 'YYYY-MM-DD HH:mm:ss', group: 'datetime' },
		{ format: 'YYYY-MM-DDTHH:mm', group: 'datetime' },
		{ format: 'YYYY-MM-DDTHH:mm:ss', group: 'datetime' },
		{ format: 'YYYY-MM-DDTHH:mm:ssZ', group: 'datetime' },
		{ format: 'DD/MM/YYYY HH:mm', group: 'datetime' },
		{ format: 'DD/MM/YYYY hh:mm A', group: 'datetime' },
		{ format: 'MM/DD/YYYY HH:mm', group: 'datetime' },
		{ format: 'MM/DD/YYYY hh:mm A', group: 'datetime' },
		{ format: 'MM-DD-YYYY hh:mm a', group: 'datetime' },
		{ format: 'DD MMM YYYY HH:mm', group: 'datetime' },
		{ format: 'DD MMM YYYY hh:mm A', group: 'datetime' },
		{ format: 'MMM DD, YYYY hh:mm A', group: 'datetime' },
		{ format: 'dddd, MMMM DD, YYYY hh:mm A', group: 'datetime' }
	];

	export const ALL_DATETIME_FORMATS: DateTimeFormat[] = [
		...DATE_FORMATS,
		...TIME_FORMATS,
		...DATETIME_FORMATS
	];
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import moment from 'moment';

	type Props = {
		formats?: DateTimeFormat[];
		groups?: ('date' | 'time' | 'datetime')[];
		previewDate?: Date;
		onLoad?: (formats?: DateTimeFormat[]) => void;
		children?: Snippet;
	};

	let {
		formats = $bindable([]),
		groups = ['date', 'time', 'datetime'],
		previewDate = new Date(),
		onLoad,
		children
	}: Props = $props();

	$effect(() => {
		const m = moment(previewDate);
		formats = ALL_DATETIME_FORMATS.filter((f) => groups.includes(f.group)).map((f) => ({
			...f,
			preview: m.format(f.format)
		}));
		onLoad && onLoad(formats);
	});
</script>

{#if children}
	{@render children()}
{/if}
