<script lang="ts">
	import type { ButtonProps } from "../../types";
	import Button from "../button/button.svelte";

 
	let { className, ...props }: ButtonProps = $props();
</script>

<Button {...props} className="bg-indigo-600 focus:bg-indigo-700 text-white p-2 px-4 {className}" />
