## PressedKeys

A sensor utility that tracks which keyboard keys are currently pressed.

### Creating an instance
```ts
const keys = new PressedKeys();
```

### Checking if keys are pressed
Use the `has` method to check if a specific key or key combination is currently pressed:
```ts
const isArrowDownPressed = $derived(keys.has("ArrowDown"));
const isCtrlAPressed = $derived(keys.has("Control", "a"));
```

### Getting all pressed keys
Access the `all` property to get a collection of all currently pressed keys:
```ts
console.log(keys.all);
```

### Registering key combination callbacks
Use `onKeys` to execute a callback when a specific key combination is pressed:
```ts
keys.onKeys(["meta", "k"], () => {
	console.log("open command palette");
});
```