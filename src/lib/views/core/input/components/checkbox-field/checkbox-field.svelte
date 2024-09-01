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
		<div class="font-medium text-sm text-gray-900">{label || ''}</div>
		<div class="text-xs text-gray-500">{desc || ''}</div>
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
			class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
			onchange={(ev) => handleChange(ev)}
		/>
		{#if position == 'left'}
			{@render labelSnippet()}
		{/if}
	</label>
</div>
