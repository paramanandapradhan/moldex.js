<script lang="ts">
	import { BROWSER } from 'esm-env';

	$effect(() => {
		if (BROWSER) {
			window.document.body.style.overflow = 'hidden';
		}

		return () => {
			if (BROWSER) {
				window.document.body.style.overflow = 'auto';
			}
		};
	});
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
	<div class="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
</div>
