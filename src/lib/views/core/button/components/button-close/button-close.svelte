<script lang="ts">
	import Button, { type ButtonPropsType } from '../button/button.svelte';

	let { className, ...props }: ButtonPropsType = $props();
</script>

<Button {...props} className="bg-gray-100 focus:bg-gray-200 p-2 px-4  {className}" />
