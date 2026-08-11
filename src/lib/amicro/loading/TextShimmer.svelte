<div class="relative text-zinc-200 font-medium text-lg">
	Thinking
	<div class="absolute inset-0 text-zinc-900 dark:text-white shimmer-sweep">
		Thinking
	</div>
</div>

<style>
	.shimmer-sweep {
		-webkit-mask-image: linear-gradient(90deg, transparent 0%, black 50%, transparent 100%);
		-webkit-mask-size: 200% 100%;
		mask-image: linear-gradient(90deg, transparent 0%, black 50%, transparent 100%);
		mask-size: 200% 100%;
		animation: shimmer-sweep 1.5s linear infinite;
	}

	@keyframes shimmer-sweep {
		from {
			-webkit-mask-position: 100% 0%;
			mask-position: 100% 0%;
		}
		to {
			-webkit-mask-position: -100% 0%;
			mask-position: -100% 0%;
		}
	}
</style>
