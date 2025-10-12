<script lang="ts" module>
	export type RadioValuetype = string | boolean | number | Date;
	export type RadioItem = { value: any; label: string; desc?: string };
	export type RadioItems = (RadioValuetype | RadioItem)[];
	export type RadioPosition = 'left' | 'right';
	export type RadioDiration = 'vertical' | 'horizontal';
	export type RadioPropsType = {
		className?: string;
		groupContainerClassName?: string;
		hasPrimitiveItemsData?: boolean;
		id?: string;
		items?: RadioItems;
		labelClassName?: string;
		name?: string;
		position?: RadioPosition;
		direction?: RadioDiration;
		radioContainerClassName?: string;
		required?: boolean;
		subtitle?: string;
		subtitleClassName?: string;
		title?: string;
		titleClassName?: string;
		value?: RadioValuetype;
		descClassName?: string;
		onChange?: (value: RadioValuetype) => void;
	};
</script>

<script lang="ts">
	let {
		direction = 'vertical',
		className,
		groupContainerClassName,
		id,
		items = [],
		labelClassName,
		name,
		position = 'left',
		radioContainerClassName,
		required,
		subtitle,
		subtitleClassName,
		title,
		titleClassName,
		value = $bindable(),
		descClassName,
		onChange
	}: RadioPropsType = $props();

	let hasPrimitiveItemsData = $derived.by(() => {
		if (items?.length) {
			let item = items[0];
			if (typeof item === 'object' && item !== null) {
				return false;
			}
		}
		return true;
	});

	let fieldsetId = $derived.by(() => {
		if (id) {
			return id;
		} else {
			return name;
		}
	});

	let preparedItems: RadioItem[] = $derived.by(() => {
		if (items?.length) {
			if (hasPrimitiveItemsData) {
				return items.map((item) => ({ label: item, value: item }) as RadioItem);
			} else {
				return items as RadioItem[];
			}
		}
		return [];
	});

	function handleChange(ev: Event, item: RadioItem) {
		value = item.value;
		if (onChange && value) {
			onChange(value);
		}
	}
</script>

{#snippet labelSnippet(item: RadioItem, index: number)}
	<div class="leading-6">
		<div class="ml-4 block text-sm font-medium text-gray-900 flex-grow {labelClassName}">
			{item.label || ''}
		</div>
		{#if item.desc}
			<div class="ml-4 block text-xs text-gray-500 flex-grow {descClassName}">
				{item.desc || ''}
			</div>
		{/if}
	</div>
{/snippet}

<fieldset id={fieldsetId}>
	{#if title}
		<legend
			class="text-sm font-semibold leading-6 text-gray-900 {required
				? 'required'
				: ''} {titleClassName}">{title}</legend
		>
	{/if}
	{#if subtitle}
		<p class="mt-1 text-sm leading-6 text-gray-600 {subtitleClassName}">{subtitle}</p>
	{/if}

	<div
		class="{title || subtitle ? 'mt-6' : ''} {direction == 'vertical'
			? 'space-y-4'
			: 'space-x-6 flex items-center'} {groupContainerClassName} "
	>
		{#each preparedItems || [] as item, index}
			<label
				class="flex items-center cursor-pointer select-none {radioContainerClassName}"
				for="option-{index}"
			>
				{#if position == 'right'}
					{@render labelSnippet(item, index)}
				{/if}

				<input
					id="option-{index}"
					{name}
					type="radio"
					value={item.value}
					checked={value === item.value}
					class="h-6 w-6 appearance-none rounded-full bg-base-200 dark:bg-base-700 dark:checked:bg-primary checked:bg-primary checked:hover:bg-primary checked:focus:bg-primary focus:ring-primary focus:shadow-primary outline-primary border-base-300 dark:border-base-600 {className}"
					onchange={(ev) => handleChange(ev, item)}
				/>

				{#if position == 'left'}
					{@render labelSnippet(item, index)}
				{/if}
			</label>
		{/each}
	</div>
</fieldset>

<style>
	[type='radio']:checked {
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
