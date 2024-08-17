<script context="module" lang="ts">
	export type TextFieldPropsType = {
		id?: string;
		label?: string;
		name?: string;
		className?: string;
		value?: string;
		type?: string;
		labelClassName?: string;
		containerClassName?: string;
	};
</script>

<script lang="ts">
	import Label from '../label/label.svelte';

	let {
		id = '',
		name = '',
		value = '',
		className = '',
		label = '',
		type = 'text',
		labelClassName = '',
		containerClassName = ''
	}: TextFieldPropsType = $props();
</script>

<div class={containerClassName}>
	<Label forName={id} {label} className={labelClassName}></Label>
	<input
		{type}
		{id}
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		required
	/>

	<!-- <Label className={labelClassName} forName={id} {label}></Label> -->
</div>
