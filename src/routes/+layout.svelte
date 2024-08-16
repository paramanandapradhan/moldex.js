<script lang="ts">
	import Referrer from '$lib/views/referrer/referrer.svelte';
	import ScreenDetector from '$lib/views/screen-detector/screen-detector.svelte';
	import '../lib/tailwind.css';

	let { children } = $props();
</script>

<Referrer />
<ScreenDetector />

{@render children()}
