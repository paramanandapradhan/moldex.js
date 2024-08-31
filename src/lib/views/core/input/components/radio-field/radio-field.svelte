<script lang="ts">
	type Valuetype = string | boolean | number | Date;
	type ItemType = { label: string; value: any };
	type ItemsType = (Valuetype | ItemType)[];
	type PropsType = {
		id?: string;
		name?: string;
		value?: Valuetype;
		items?: ItemsType;
		hasPrimitiveItemsData?: boolean;
		title?: string;
		subtitle?: string;
		titleClassName?: string;
		subtitleClassName?: string;
		label?: string;
		labelClassName?: string;
		className?: string;
		containerClassName?: string;
		required?: boolean;
		position?: 'left' | 'right';
	};

	let {
		id,
		name,
		title,
		subtitle,
		value,
		items = [],
		titleClassName,
		subtitleClassName,
		label,
		labelClassName,
		className,
		containerClassName,
		required,
		position = 'left',
		hasPrimitiveItemsData
	}: PropsType = $props();

	let fieldsetId = $derived.by(() => {
		if (id) {
			return id;
		} else {
			return name;
		}
	});

	let preparedItems: ItemType[] = $derived.by(() => {
		if (items?.length) {
			if (hasPrimitiveItemsData) {
				return items.map((item) => ({ label: item, value: item }) as ItemType);
			} else {
				return items as ItemType[];
			}
		}
		return [];
	});

	function handleChange(ev: any) {
		console.log(ev);
	}
</script>

{#snippet labelSnippet(item: ItemType, index: number)}
	<label
		for="option-{index}"
		class="ml-3 block text-sm font-medium leading-6 text-gray-900 flex-grow {required
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
	<div class={title || subtitle ? 'mt-6 space-y-6' : ''}>
		{#each preparedItems || [] as item, index}
			<div class="flex items-center {containerClassName}">
				{#if position == 'right'}
					{@render labelSnippet(item, index)}
				{/if}

				<input
					id="option-{index}"
					{name}
					type="radio"
					value={item.value}
					checked={value == item.value}
					class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 {className}"
					onchange={(ev) => handleChange(ev)}
				/>

				{#if position == 'left'}
					{@render labelSnippet(item, index)}
				{/if}
			</div>
		{/each}
	</div>
</fieldset>
