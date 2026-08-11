## AnimationFrames

A declarative wrapper around the browser's `requestAnimationFrame` API that adds FPS limiting and frame metrics while handling cleanup automatically.

### Core Features
- Wraps `requestAnimationFrame` with a declarative API
- FPS limiting capabilities via `fpsLimit` option
- Frame metrics including `fps` property and `delta` (time since last frame in ms)
- Automatic cleanup

### Usage

```svelte
<script lang="ts">
	import { AnimationFrames } from "runed";

	let frames = $state(0);
	let fpsLimit = $state(10);
	let delta = $state(0);
	
	const animation = new AnimationFrames(
		(args) => {
			frames++;
			delta = args.delta;
		},
		{ fpsLimit: () => fpsLimit }
	);
</script>

<button onclick={() => animation.running ? animation.stop() : animation.start()}>
	{animation.running ? "Stop" : "Start"}
</button>
<p>FPS: {animation.fps.toFixed(0)}, Delta: {delta.toFixed(0)}ms</p>
```

### API
- Constructor takes a callback function and options object
- Callback receives `args` object with `delta` property (milliseconds since last frame)
- Options: `fpsLimit` can be a number or function returning a number (0 = unlimited)
- Properties: `fps` (current frames per second), `running` (boolean state)
- Methods: implied `start()` and `stop()` for controlling animation