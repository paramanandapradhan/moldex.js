<script lang="ts">let {
  path,
  className = "",
  size = 24,
  fill = "currentColor",
  viewBox = ""
} = $props();
$effect(() => {
  viewBox = viewBox || `0 0 ${size} ${size}`;
});
</script>

<svg class=" h-6 w-6 align-middle {className}" {viewBox} fill="currentColor">
	<path d={path} />
</svg>
