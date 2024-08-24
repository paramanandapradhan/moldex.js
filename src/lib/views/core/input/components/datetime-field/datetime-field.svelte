<script lang="ts">
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';

	let props: InputFieldPropsType = $props();
</script>

<InputField {...props} type="datetime-local"  />
