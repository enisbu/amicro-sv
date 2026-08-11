<script lang="ts">
	import { motion } from 'motion-sv';

	let otp = $state(['', '', '', '']);
	let inputs: HTMLInputElement[] = [];

	function handleInput(event: Event & { currentTarget: HTMLInputElement }, idx: number) {
		const value = event.currentTarget.value;
		otp[idx] = value;
		if (value && idx < 3) {
			inputs[idx + 1]?.focus();
		}
	}
</script>

<div class="flex gap-2">
	{#each otp as digit, i (i)}
		<motion.input
			bind:ref={inputs[i]}
			type="text"
			maxlength={1}
			value={digit}
			whileFocus={{ scale: 1.1 }}
			oninput={(event: Event & { currentTarget: HTMLInputElement }) => handleInput(event, i)}
			class="w-10 h-12 text-center text-lg font-bold rounded-xl border outline-none bg-white border-neutral-300 text-black focus:border-indigo-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
		/>
	{/each}
</div>
