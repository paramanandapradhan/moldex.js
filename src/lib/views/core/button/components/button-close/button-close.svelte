<script lang="ts">
	import type { ButtonProps } from '../../types';
	import Button from '../button/button.svelte';

	let { className, ...props }: ButtonProps = $props();
</script>

<Button {...props} size="none" className="bg-gray-100 focus:bg-gray-200 p-2 px-4  {className}" />
