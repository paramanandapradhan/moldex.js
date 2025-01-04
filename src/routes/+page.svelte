<script lang="ts">
	import Pagination from '$lib/views/core/pagination/components/pagination/pagination.svelte';
</script>

<div class="min-h-full">
	<div class="p-6">
		<Pagination
			length={100}
			pageSize={5}
			pageIndex={0}
			disbaleSizeMenuButton={true}
			onPageIndexChange={(index) => console.log(index)}
			onPageSizeChange={(size) => console.log(size)}
		/>
	</div>
</div>
