<script lang="ts">
	import { dateFormat, dateToAgo, toDate } from '$lib/services';

	import { BROWSER } from 'esm-env';

	type PropsType = {
		input: Date | number | string | { seconds: number; nanoseconds: number };
		format?: 'ago' | string;
	};

	let { input, format = 'DD-MM-YYYY hh:mm a' }: PropsType = $props();

	let dateString: string = $state('');

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

	$effect(() => {
		BROWSER && prepareDate(input);
	});
</script>

<span>
	{dateString || ''}
</span>
