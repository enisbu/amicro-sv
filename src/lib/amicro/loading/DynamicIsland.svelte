<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="bg-zinc-950 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center px-4 py-2 gap-3 h-8 shadow-sm"
	animate={{
		width: [80, 110, 80]
	}}
	transition={{
		duration: 2.2,
		repeat: Infinity,
		ease: 'easeInOut'
	}}
>
	<Div
		class="w-1.5 h-1.5 rounded-full bg-emerald-500"
		animate={{ opacity: [0.4, 1, 0.4] }}
		transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
	/>
	<div class="flex gap-1 items-center h-2">
		{#each [0, 1, 2] as i}
			<Div
				class="w-0.5 bg-zinc-300 dark:bg-zinc-500 rounded-full"
				animate={{ height: [3, 8, 3] }}
				transition={{
					duration: 0.8,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: i * 0.15
				}}
			/>
		{/each}
	</div>
</Div>
