<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	interface Props {
		theme?: 'light' | 'dark';
	}

	let { theme = 'light' }: Props = $props();
</script>

<div class="relative font-medium text-sm tracking-wide select-none">
	<span class="text-zinc-400 dark:text-zinc-600"> Slide to unlock </span>
	<Div
		class="absolute inset-0 text-zinc-950 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-transparent via-current to-transparent"
		style={{
			backgroundSize: '200% 100%'
		}}
		animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
		transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
	>
		Slide to unlock
	</Div>
</div>
