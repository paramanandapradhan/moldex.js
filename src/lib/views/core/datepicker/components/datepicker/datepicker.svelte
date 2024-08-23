<script lang="ts">
	import '../../../../../tailwind.css';
	import { mdilCalendar } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';

	
	type PropsType = {
		placeholder?: string;
		className?: string;
	};

	let { placeholder = 'Select date', className = '' }: PropsType = $props();

	let selectedDate: string = $state('');

	// Function to handle date change
	const handleDateChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		selectedDate = target.value;
	};

	$effect(() => {
		console.log('Selected date:', selectedDate);
	});
</script>

<div class={`relative max-w-sm ${className}`}>
	<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
		<Icon path={mdilCalendar} className="w-4 h-4 text-gray-500 dark:text-gray-400" />
	</div>
	<input
		type="date"
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
		bind:value={selectedDate}
		onchange={handleDateChange}
		{placeholder}
	/>
</div>
