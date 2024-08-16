<script lang="ts">
	import '../../../../tailwind.css';
	type PropsType = {
		className?: string;
	};
	let { className = '' }: PropsType = $props();
</script>

<div class="h-6 lg:w-px lg:bg-gray-200 {className}" aria-hidden="true"></div>
