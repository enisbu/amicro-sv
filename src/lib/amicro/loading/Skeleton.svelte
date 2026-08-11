<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	interface Props {
		class?: string;
		shimmerColor?: 'light' | 'dark';
	}

	let { class: className = '', shimmerColor = 'dark' }: Props = $props();

	const shimmerGradient = $derived(
		shimmerColor === 'dark'
			? 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)'
			: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0) 100%)'
	);
</script>

<div
	class="relative overflow-hidden rounded-md bg-neutral-200/50 dark:bg-neutral-800/40 {className}"
>
	<Div
		initial={{ x: '-150%' }}
		animate={{ x: '150%' }}
		transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
		style={{ background: shimmerGradient }}
		class="absolute inset-0 w-[80%] h-full"
	/>
</div>
