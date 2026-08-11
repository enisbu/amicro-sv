<script lang="ts">
	import { motion } from 'motion-sv';
	import { Upload } from '@lucide/svelte';
</script>

<motion.div
	whileHover={{ scale: 1.02 }}
	class="w-full max-w-[240px] p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors border-neutral-300 hover:border-indigo-500 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900/50"
>
	<Upload class="w-6 h-6 text-indigo-500 animate-bounce" />
	<span class="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
		>Drop files here</span
	>
	<span class="text-[10px] text-neutral-400">SVG, PNG, JPG (max 5MB)</span>
</motion.div>
