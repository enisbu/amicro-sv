Reactive wrapper around the browser's Geolocation API for accessing device location.

**Usage:**
```svelte
import { useGeolocation } from "runed";
const location = useGeolocation();
```

Access location data via `location.position.coords` and `location.position.timestamp`. Check `location.error` for errors and `location.isSupported` for API support. Control tracking with `location.pause()` and `location.resume()`, checking `location.isPaused` for state.

**Options:**
- `immediate` (boolean, default: true): Start tracking immediately or wait for `resume()` call
- Accepts standard PositionOptions (timeout, enableHighAccuracy, maximumAge)

**Return type includes:**
- `isSupported`: boolean indicating Geolocation API availability
- `position`: GeolocationPosition with coords and timestamp
- `error`: GeolocationPositionError or null
- `isPaused`: boolean tracking state
- `pause()` and `resume()`: control methods