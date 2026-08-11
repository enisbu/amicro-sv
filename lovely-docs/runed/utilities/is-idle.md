Tracks user activity and determines idle state based on configurable timeout. Monitors mouse movement, keyboard input, and touch events.

**Usage:**
```ts
import { IsIdle } from "runed";
const idle = new IsIdle({ timeout: 1000 });
// idle.current - boolean idle state
// idle.lastActive - timestamp of last activity
```

**Options:**
- `events` - array of window events to monitor (default: mousemove, mousedown, resize, keydown, touchstart, wheel)
- `timeout` - milliseconds before idle state triggers (default: 60000)
- `detectVisibilityChanges` - detect document visibility changes (default: false)
- `initialState` - initial idle state (default: false)

**API:**
- `current` - readonly boolean indicating if user is idle
- `lastActive` - readonly number timestamp of last user activity