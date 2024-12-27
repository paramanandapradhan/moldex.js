<script lang="ts">
	import { isMobileScreen, openPickerDialog } from '$lib';
	import Button from '$lib/views/core/button/components/button/button.svelte';

	let data: string = $state('');

	async function handleClick() {
		let res: any = await openPickerDialog({
			value: data,
			items: ['Bangalore', 'Delhi', 'Mumbai', 'Sambalpur'],
			hasCheckbox: true,
			hasHeader: true,
			hasTitle: true,
			hasHeaderBack: isMobileScreen(),
			hasHeaderClose: !isMobileScreen(),
			title: 'Select Cities'
		});
		console.log('picker', res);
		data = res;
	}
</script>

<div class="min-h-full flex justify-center">
	<div>
		<Button appearance="border-primary" onClick={handleClick}>Picker</Button>

		<div>
			{data}
		</div>
	</div>
</div>
