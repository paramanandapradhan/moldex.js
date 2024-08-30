<script lang="ts">
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';

	let { maxlength, ...props }: InputFieldPropsType = $props();
</script>

<InputField {...props} type="text" maxlength={maxlength || 200} />
