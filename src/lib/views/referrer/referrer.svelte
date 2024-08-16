<script lang="ts">
	import { page } from '$app/stores';
	import { referrer } from '$lib/services/navigation/navigation-service';
	import { BROWSER } from 'esm-env';

	$effect(() => {
		if (BROWSER) {
			const unsubscribe = page.subscribe((_) => {
				referrer.update((previous:any) => {
					return previous === location.href ? previous : location.href;
				});
			});
			return () => {
				unsubscribe && unsubscribe();
			};
		}
	});
</script>
