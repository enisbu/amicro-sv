# runed

Comprehensive collection of reactive utilities for DOM interaction, state management, async operations, and browser APIs, designed for Svelte.

  utilities/: Comprehensive collection of reactive utilities for DOM interaction, state management, async operations, and browser APIs.
    ./utilities/active-element.md: Reactive wrapper for document.activeElement with Shadow DOM support and optional custom document scoping.
    ./utilities/animation-frames.md: requestAnimationFrame wrapper with FPS limiting, frame metrics (fps, delta), and automatic cleanup
    ./utilities/boolattr.md: boolAttr(value): "" | undefined — converts truthy/falsy values to empty string or undefined for proper HTML boolean attribute behavior
    ./utilities/context.md: Type-safe Context API wrapper: define with `new Context<T>(name)`, set with `.set(value)` in parent init, read with `.get()` or `.getOr(fallback)` in child init.
    ./utilities/debounced.md: Debounced state wrapper with cancel, immediate set, and immediate update methods; access value via .current property
    ./utilities/element-rect.md: ElementRect: reactive DOMRect tracking with individual dimension/position properties and complete rect object
    ./utilities/element-size.md: ElementSize: reactive width/height tracker for DOM elements, updates automatically on dimension changes
    ./utilities/extract.md: Utility that unwraps MaybeGetter<T> (function or static value) to T, with optional fallback for undefined.
    ./utilities/finite-state-machine.md: Strongly-typed finite state machine with state→event→state transitions, action functions, lifecycle hooks (_enter/_exit), wildcard handlers, and debounce scheduling.
    ./utilities/is-document-visible.md: Reactive wrapper around Page Visibility API; tracks document.hidden state with automatic visibilitychange event listening.
    ./utilities/is-focus-within.md: IsFocusWithin utility class reactively tracks whether any descendant has focus in a container element; constructor takes getter returning HTMLElement, exposes readonly boolean current property.
    ./utilities/is-idle.md: User idle detection utility tracking activity via events (mousemove, keydown, touch, etc.) with configurable timeout; exposes current idle state and lastActive timestamp.
    ./utilities/is-in-viewport.md: Class utility that tracks viewport visibility of DOM elements via Intersection Observer; constructor takes element/getter and optional config, exposes `current` boolean property.
    ./utilities/is-mounted.md: IsMounted class provides a mounted state object with a `current` property; shorthand for onMount/effect-based mount tracking.
    ./utilities/on-cleanup.md: onCleanup(cb): registers cleanup function for effect context disposal; replaces onDestroy; works in components and $effect.root
    ./utilities/on-click-outside.md: Utility that triggers callback on clicks outside a specified element; supports programmatic control via start/stop methods and immediate/detectIframe options.
    ./utilities/persisted-state.md: Reactive state container with automatic localStorage/sessionStorage persistence, cross-tab sync, connection control, and custom serialization support; plain objects/arrays deeply reactive, class instances require full replacement.
    ./utilities/pressed-keys.md: Keyboard key press tracker with has(), all property, and onKeys() callback registration for key combinations.
    ./utilities/previous.md: Previous: reactive wrapper maintaining prior getter value via `.current` property for state change tracking.
    ./utilities/resource.md: Reactive async data fetching utility with automatic request cancellation, loading/error states, debounce/throttle, cleanup hooks, multiple dependencies, and pre-render support.
    ./utilities/scroll-state.md: Reactive scroll position/direction/edge tracking with programmatic scrolling, RTL support, and debounced stop callbacks.
    ./utilities/state-history.md: StateHistory utility for tracking state changes with undo/redo; constructor takes getter/setter, provides undo/redo/clear methods and canUndo/canRedo/log properties.
    ./utilities/textarea-autosize.md: Textarea utility that auto-adjusts height to content via off-screen clone measurement; supports grow-only mode via minHeight and max height limits.
    ./utilities/throttled.md: Throttled state wrapper with configurable delay; provides cancel() and setImmediately() methods.
    ./utilities/usedebounce.md: useDebounce: delays callback execution until after inactivity period; accepts callback and duration getter; provides runScheduledNow(), cancel(), and pending property
    ./utilities/use-event-listener.md: useEventListener: attach auto-disposed event listeners to elements via function-based target, with automatic cleanup on component destroy or element change
    ./utilities/use-geolocation.md: Reactive Geolocation API wrapper with position tracking, pause/resume control, and error handling.
    ./utilities/use-intersection-observer.md: useIntersectionObserver hook: observe element intersection with callback, control via pause/resume/stop, check isActive getter
    ./utilities/use-interval.md: useInterval: reactive setInterval wrapper with pause/resume, tick counter, optional callback, reactive delay support via function, options for immediate start/callback execution.
    ./utilities/use-mutation-observer.md: useMutationObserver hook observes DOM element changes via MutationObserver API; accepts element getter, callback receiving mutations array, and config options; returns stop() method.
    ./utilities/use-resize-observer.md: useResizeObserver hook: observe element dimensions via callback with ResizeObserverEntry array, stop() to unobserve
    ./utilities/usesearchparams.md: Reactive, type-safe URL search params with schema validation (Zod/Valibot/Arktype/built-in), defaults, compression, debouncing, history control, date formatting, and Zod codec support; top-level reactivity only.
    ./utilities/use-throttle.md: useThrottle(callback, durationFn) - throttles callback execution to max once per duration returned by durationFn
    ./utilities/watch.md: watch(getter, callback, options?) - manually track specific reactive dependencies; supports single/array sources, deep watching, lazy execution, and one-time variants
  ./getting-started.md: Install via npm; import utilities into Svelte components/modules; use with $state and $effect for reactivity (e.g., activeElement.current).
  ./introduction.md: Svelte 5 utilities extending Runes with powerful, consistent, type-safe primitives for reactive applications; community-driven, MIT licensed, enhances rather than replaces core Svelte.
