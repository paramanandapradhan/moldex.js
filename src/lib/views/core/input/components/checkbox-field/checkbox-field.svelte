<script lang="ts">
	type CheckboxPropsType = {
		className?: string;
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
		className,
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

	let inputRef: HTMLInputElement | null = $state(null);

	export function getElement() {
		return inputRef;
	}

	export function select() {
		return inputRef && (inputRef as HTMLInputElement).select();
	}

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
			bind:this={inputRef}
			bind:checked={value}
			id={id || name}
			aria-describedby="comments-description"
			name={name || id}
			type="checkbox"
			class="h-6 w-6 appearance-none cursor-pointer rounded color-primary hover:color-primary-500 bg-base-200 dark:bg-base-700 dark:checked:bg-primary checked:bg-primary outline-primary border-base-300 dark:border-base-600 {className}"
			onchange={(ev) => handleChange(ev)}
		/>
		{#if position == 'left'}
			{@render labelSnippet()}
		{/if}
	</label>
</div>

<style>
	[type='checkbox']:checked {
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
