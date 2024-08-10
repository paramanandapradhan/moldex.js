<script lang="ts">
	import Icon from '$lib/icon/components/icon/icon.svelte';
	import { mdiBellOutline } from '$lib/icon/services/icon-path-service.js';

	type PropsType = {
		className?: string;
		onclick?: (ev: MouseEvent) => void;
	};

	let { className = '', onclick = (ev: MouseEvent) => {} }: PropsType = $props();
</script>

<button type="button" class={className} {onclick}>
	<Icon path={mdiBellOutline} />
</button>
