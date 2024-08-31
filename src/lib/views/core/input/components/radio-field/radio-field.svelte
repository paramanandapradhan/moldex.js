<script lang="ts" module>
	export type RadioValuetype = string | boolean | number | Date;
	export type RadioItemType = { value: any; label: string };
	export type RadioItemsType = (RadioValuetype | RadioItemType)[];
	export type RadioPositionType = 'left' | 'right';
	export type RadioDirationType = 'vertical' | 'horizontal';
	export type RadioPropsType = {
		className?: string;
		groupContainerClassName?: string;
		hasPrimitiveItemsData?: boolean;
		id?: string;
		items?: RadioItemsType;
		labelClassName?: string;
		name?: string;
		position?: RadioPositionType;
		direction?: RadioDirationType;
		radioContainerClassName?: string;
		required?: boolean;
		subtitle?: string;
		subtitleClassName?: string;
		title?: string;
		titleClassName?: string;
		value?: RadioValuetype;
		onChange?: (value: RadioValuetype) => void;
	};
</script>

<script lang="ts">
	let {
		direction = 'vertical',
		className,
		groupContainerClassName,
		hasPrimitiveItemsData,
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
		onChange
	}: RadioPropsType = $props();

	let fieldsetId = $derived.by(() => {
		if (id) {
			return id;
		} else {
			return name;
		}
	});

	let preparedItems: RadioItemType[] = $derived.by(() => {
		if (items?.length) {
			if (hasPrimitiveItemsData) {
				return items.map((item) => ({ label: item, value: item }) as RadioItemType);
			} else {
				return items as RadioItemType[];
			}
		}
		return [];
	});

	function handleChange(ev: Event, item: RadioItemType) {
		value = item.value;
		if (onChange && value) {
			onChange(value);
		}
	}
</script>

{#snippet labelSnippet(item: RadioItemType, index: number)}
	<label
		for="option-{index}"
		class="ml-3 block text-sm font-medium leading-6 text-gray-900 flex-grow cursor-pointer select-none {required
			? 'required'
			: ''} {labelClassName}">{item.label || ''}</label
	>
{/snippet}

<fieldset id={fieldsetId}>
	{#if title}
		<legend class="text-sm font-semibold leading-6 text-gray-900 {titleClassName}">{title}</legend>
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
			<div class="flex items-center {radioContainerClassName}">
				{#if position == 'right'}
					{@render labelSnippet(item, index)}
				{/if}

				<input
					id="option-{index}"
					{name}
					type="radio"
					value={item.value}
					checked={value === item.value}
					class="h-4 w-4 cursor-pointer select-none border-gray-300 text-indigo-600 focus:ring-indigo-600 {className}"
					onchange={(ev) => handleChange(ev, item)}
				/>

				{#if position == 'left'}
					{@render labelSnippet(item, index)}
				{/if}
			</div>
		{/each}
	</div>
</fieldset>
