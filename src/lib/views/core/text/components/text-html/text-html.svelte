<script lang="ts">
	import '../../../../../tailwind.css';
	let { input }: { input: string } = $props();
</script>

<span>
	{@html input || ''}
</span>
