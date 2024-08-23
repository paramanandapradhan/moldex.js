<script lang="ts">
	import '../../../../../tailwind.css';
</script>

<div class="flex items-center justify-center h-44">
	<div class="text-xl font-semibold">
		Loading<span class="dot dot-1 mx-1">.</span><span class="dot dot-2 mx-1">.</span><span
			class="dot dot-3 mx-1">.</span
		>
	</div>
</div>

<style>
	@keyframes wave {
		0%,
		60%,
		100% {
			transform: initial;
			opacity: 0.2;
		}
		30% {
			transform: translateY(-10px);
			opacity: 1;
		}
	}

	.dot {
		display: inline-block;
		animation: wave 1.5s infinite;
		font-size: 2rem;
	}

	.dot-1 {
		animation-delay: 0s;
		color: #1f2937;
	}

	.dot-2 {
		animation-delay: 0.3s;
		color: #4b5563;
	}

	.dot-3 {
		animation-delay: 0.6s;
		color: #9ca3af;
	}
</style>
