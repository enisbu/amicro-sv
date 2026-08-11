<script lang="ts">
	function grow(event: Event & { currentTarget: HTMLTextAreaElement }) {
		const target = event.currentTarget;
		target.style.height = 'auto';
		target.style.height = `${target.scrollHeight}px`;
	}
</script>

<div class="w-full max-w-[240px]">
	<textarea
		rows={2}
		placeholder="Type to test auto-grow..."
		oninput={grow}
		class="w-full px-3 py-2 rounded-xl border text-xs outline-none resize-none transition-all bg-white border-neutral-300 text-black dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
	></textarea>
</div>
