<script lang="ts">
	import { Referrer, ScreenDetector } from '$lib/views';

	 
	import '../lib/tailwind.css';

	let { children } = $props();
</script>

<Referrer />
<ScreenDetector />

{@render children()}
