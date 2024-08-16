<script lang="ts">
	import { page } from '$app/stores';
	import { referrer } from '$lib/services/navigation/navigation-service';
	import { BROWSER } from 'esm-env';

	$effect(() => {
		if (BROWSER) {
			const unsubscribe = page.subscribe((_) => {
				referrer.referer = referrer.referer === location.href ? referrer.referer : location.href;
			});
			return () => {
				unsubscribe && unsubscribe();
			};
		}
	});
</script>
