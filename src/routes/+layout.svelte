<script lang="ts">
	import { ScreenDetector } from '$lib/index.js';
	import '../app.css';

	let { children } = $props();
</script>

<!-- <Referrer /> -->
<ScreenDetector />

{@render children()}
