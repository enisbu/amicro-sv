<script lang="ts">
	import { motion } from 'motion-sv';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();
	const isDark = $derived(app.theme === 'dark');

	const DARK_GLOW = [
		'0 0 10px rgba(99,102,241,0.5)',
		'0 0 25px rgba(99,102,241,0.9)',
		'0 0 10px rgba(99,102,241,0.5)'
	];
	const LIGHT_GLOW = [
		'0 0 10px rgba(79,70,229,0.3)',
		'0 0 20px rgba(79,70,229,0.6)',
		'0 0 10px rgba(79,70,229,0.3)'
	];
</script>

<motion.div
	animate={{ textShadow: isDark ? DARK_GLOW : LIGHT_GLOW }}
	transition={{ duration: 2, repeat: Infinity }}
	class="font-black text-3xl tracking-tight text-indigo-600 dark:text-indigo-300"
>
	GLOW TEXT
</motion.div>
