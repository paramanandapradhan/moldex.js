<script lang="ts" module>
	import type { Timezone } from '../types';

	function getOffsetMinutes(tz: string): number {
		try {
			const dtf = new Intl.DateTimeFormat('en-US', {
				timeZone: tz,
				timeZoneName: 'shortOffset'
			});
			const parts = dtf.formatToParts(new Date());
			const off = parts.find((p) => p.type === 'timeZoneName')?.value || 'GMT+0';
			const m = off.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
			if (!m) return 0;
			const sign = m[1] === '-' ? -1 : 1;
			const h = parseInt(m[2] || '0', 10);
			const mm = parseInt(m[3] || '0', 10);
			return sign * (h * 60 + mm);
		} catch {
			return 0;
		}
	}

	function formatOffset(min: number): string {
		const sign = min < 0 ? '-' : '+';
		const abs = Math.abs(min);
		const h = String(Math.floor(abs / 60)).padStart(2, '0');
		const m = String(abs % 60).padStart(2, '0');
		return `UTC${sign}${h}:${m}`;
	}

	function getLongName(tz: string): string {
		try {
			const dtf = new Intl.DateTimeFormat('en-US', {
				timeZone: tz,
				timeZoneName: 'long'
			});
			const parts = dtf.formatToParts(new Date());
			return parts.find((p) => p.type === 'timeZoneName')?.value || '';
		} catch {
			return '';
		}
	}

	function humanize(seg: string): string {
		return seg.replace(/_/g, ' ');
	}

	function splitName(name: string): { region: string; city: string } {
		const parts = name.split('/');
		if (parts.length === 1) return { region: '', city: humanize(parts[0]) };
		const city = humanize(parts[parts.length - 1]);
		const region = parts.slice(0, -1).map(humanize).join(' / ');
		return { region, city };
	}

	export function loadTimezones(): Timezone[] {
		let names: string[] = [];
		try {
			const anyIntl = Intl as any;
			if (typeof anyIntl.supportedValuesOf === 'function') {
				names = anyIntl.supportedValuesOf('timeZone');
			}
		} catch {
			names = [];
		}
		if (!names.length) {
			names = ['UTC'];
		}
		return names
			.map((name) => {
				const offsetMinutes = getOffsetMinutes(name);
				const { region, city } = splitName(name);
				return {
					name,
					offset: formatOffset(offsetMinutes),
					offsetMinutes,
					longName: getLongName(name),
					region,
					city
				};
			})
			.sort((a, b) => a.offsetMinutes - b.offsetMinutes || a.name.localeCompare(b.name));
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		timezones?: Timezone[];
		onLoad?: (timezones?: Timezone[]) => void;
		children?: Snippet;
	};

	let { timezones = $bindable([]), onLoad, children }: Props = $props();

	$effect(() => {
		timezones = loadTimezones();
		onLoad && onLoad(timezones);
	});
</script>

{#if children}
	{@render children()}
{/if}
