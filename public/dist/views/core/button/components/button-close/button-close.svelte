<script lang="ts">
	import Button, { type ButtonProps } from '../button/button.svelte';

	let { className, ...props }: ButtonProps = $props();
</script>

<Button {...props} size="none" className="bg-gray-100 focus:bg-gray-200 p-2 px-4  {className}" />
