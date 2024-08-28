<script lang="ts">
	import Button, { type ButtonPropsType } from '../button/button.svelte';

	let { className, ...props }: ButtonPropsType = $props();
</script>

<Button {...props} className="bg-indigo-600 focus:bg-indigo-700 text-white p-2 px-4 {className}" />
