<script lang="ts">
	let { input }: { input: string } = $props();
</script>

<span>
	{@html input || ''}
</span>
