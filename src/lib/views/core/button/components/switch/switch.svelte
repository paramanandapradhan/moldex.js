 
<script lang="ts">
	import type { SwitchProps } from "../../types";

	let {
		id = '',
		checked = false,
		disabled = false,
		className = '',
		size = 'md',
		onChange
	}: SwitchProps = $props();

	function toggle() {
		if (disabled) return;
		checked = !checked;
		onChange?.(checked);
	}

	// Size mapping
	let sizeClass = $derived.by(() => {
		switch (size) {
			case 'sm':
				return {
					wrapper: 'h-4 w-8',
					circle: 'h-3 w-3 translate-x-1',
					circleChecked: 'translate-x-5'
				};
			case 'lg':
				return {
					wrapper: 'h-8 w-16',
					circle: 'h-6 w-6 translate-x-1',
					circleChecked: 'translate-x-8'
				};
			case 'md':
			default:
				return {
					wrapper: 'h-6 w-11',
					circle: 'h-4 w-4 translate-x-1',
					circleChecked: 'translate-x-6'
				};
		}
	});
</script>

<button
	{id}
	type="button"
	{disabled}
	onclick={toggle}
	aria-label="Switch"
	class="relative inline-flex items-center rounded-full transition-colors duration-300
		{checked ? 'bg-primary-600' : 'bg-neutral-300'} 
		{disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} 
		{sizeClass.wrapper} {className}"
>
	<span
		class="inline-block rounded-full bg-white shadow transform transition-transform duration-300
			{sizeClass.circle} {checked ? sizeClass.circleChecked : ''}"
	>
	</span>
</button>
