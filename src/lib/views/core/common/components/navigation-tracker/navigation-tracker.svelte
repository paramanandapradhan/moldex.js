<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { recordNavigation } from '$lib/services/navigation/navigation-service.js';

	// Seed the stack with the current URL so goBack works from the very first page.
	onMount(() => {
		recordNavigation(window.location.pathname + window.location.search);
	});

	// Record every subsequent SPA navigation (push or replace — we track all).
	afterNavigate(({ to, type }) => {
		// 'enter' is the initial SSR/hydration load, already seeded in onMount.
		if (type === 'enter' || !to) return;
		recordNavigation(to.url.pathname + to.url.search);
	});
</script>
