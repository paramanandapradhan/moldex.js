<script lang="ts">
	import { dateFormat, dateToAgo, toDate } from '$lib/services/date-service';
	import { BROWSER } from 'esm-env';

	export let input: any;
	export let format: 'ago' | string = 'DD-MM-YYYY hh:mm a';

	let dateString: string = '';

	function prepareDate(..._: any) {
		// console.log('date data', data);
		let date: Date | undefined;
		if (input) {
			date = toDate(input);
		}
		if (date) {
			if (format == 'ago') {
				dateString = dateToAgo(date)!;
			} else {
				dateString = dateFormat(date, format)!;
			}
		}
	}

	$: BROWSER && prepareDate(input);
</script>

<span>
	{dateString || ''}
</span>
