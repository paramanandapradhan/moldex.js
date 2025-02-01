<script lang="ts">
	import { ScreenDetector } from '$lib/views';

	import '../lib/theme.css';
	import '../lib/tailwind.css';

	let { children } = $props();
</script>

<!-- <Referrer /> -->
<ScreenDetector />

{@render children()}
