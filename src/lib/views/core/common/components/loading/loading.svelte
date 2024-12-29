<script lang="ts">
	import Spinner from '$lib/views/core/spinner/components/spinner/spinner.svelte';

	type Props = {
		spinnerClassName?: string;
		className?: string;
	};

	let { className = '', spinnerClassName = 'text-primary' }: Props = $props();
</script>

<div class="flex items-center justify-center p-6 {className}">
	<Spinner className={spinnerClassName} />
</div>
