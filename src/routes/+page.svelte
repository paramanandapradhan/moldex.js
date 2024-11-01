<script lang="ts">
	import { openCropperDialog,   } from '$lib';
	import { readUrlAsFile } from '$lib/services/utils/file-service';
	import RangeField from '$lib/views/core/input/components/range-field/range-field.svelte';

	let file: any;
 
</script>

<div class="min-h-full">
	<div>
		<RangeField min={0} max={100} value={50} size="sm"/>
	</div>
	 
</div>
