<script lang="ts">
	type CheckboxPropsType = {
		containerClassName?: string;
		desc?: string;
		descClassName?: string;
		id?: string;
		label?: string;
		labelClassName?: string;
		name?: string;
		onChange?: (value: boolean) => void;
		position?: 'left' | 'right';
		value?: boolean;
	};

	let {
		containerClassName,
		desc,
		descClassName,
		id,
		label,
		labelClassName,
		name,
		onChange,
		position = 'left',
		value = $bindable(false)
	}: CheckboxPropsType = $props();

	function handleChange(ev: Event) {
		if (onChange) {
			onChange(value);
		}
	}
</script>

{#snippet labelSnippet()}
	<div class="text-sm leading-6 mx-4 flex-grow">
		<div class="font-medium text-sm text-base-900 dark:text-base-100 {labelClassName}">
			{label || ''}
		</div>
		<div class="text-xs text-base-500 dark:text-base-500 {descClassName}">{desc || ''}</div>
	</div>
{/snippet}
<div class=" {containerClassName}">
	<label for={id || name} class="flex items-center cursor-pointer select-none">
		{#if position == 'right'}
			{@render labelSnippet()}
		{/if}
		<input
			bind:checked={value}
			id={id || name}
			aria-describedby="comments-description"
			name={name || id}
			type="checkbox"
			class="w-4 h-4 rounded focus:ring-2 text-pimary-600 dark:text-pimary-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-pimary-500 dark:focus:ring-pimary-600"
			onchange={(ev) => handleChange(ev)}
		/>
		{#if position == 'left'}
			{@render labelSnippet()}
		{/if}
	</label>
</div>
