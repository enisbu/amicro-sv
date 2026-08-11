<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	interface Props {
		theme?: 'light' | 'dark';
	}

	let { theme = 'light' }: Props = $props();

	const isDark = $derived(theme === 'dark');
</script>

<div
	class="relative w-12 h-12 rounded-full border border-zinc-800/10 dark:border-white/10 flex items-center justify-center overflow-hidden"
>
	<div class="absolute w-8 h-8 rounded-full border border-zinc-800/5 dark:border-white/5"></div>
	<div class="absolute w-4 h-4 rounded-full border border-zinc-800/5 dark:border-white/5"></div>

	<div class="absolute w-1.5 h-1.5 rounded-full bg-zinc-800/80 dark:bg-white/80"></div>

	<Div
		class="absolute inset-0 origin-center"
		style={{
			background: isDark
				? 'conic-gradient(from 0deg, transparent 50%, rgba(255,255,255,0.02) 65%, rgba(255,255,255,0.15) 85%, rgba(255,255,255,0.55) 100%)'
				: 'conic-gradient(from 0deg, transparent 50%, rgba(39,39,42,0.02) 65%, rgba(39,39,42,0.1) 85%, rgba(39,39,42,0.45) 100%)'
		}}
		animate={{ rotate: 360 }}
		transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
	/>
</div>
