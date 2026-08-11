<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-[-4px]">
	<Div
		class="w-8 h-8 border-4 border-dashed border-zinc-800 dark:border-zinc-700 rounded-full"
		animate={{ rotate: 360 }}
		transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
	/>
	<Div
		class="w-6 h-6 border-[3px] border-dashed border-zinc-500 rounded-full mt-3"
		animate={{ rotate: -360 }}
		transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
	/>
</div>
