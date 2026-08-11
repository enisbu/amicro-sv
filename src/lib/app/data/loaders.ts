import type { Component } from 'svelte';
import * as loading from '$lib/amicro/loading/index.js';

export interface LoaderConfig {
  name: string;
  component: Component<Record<string, unknown>>;
  kebabName: string;
}

export interface LoaderGroup {
  title: string;
  loaders: LoaderConfig[];
}

export const loaderGroups: LoaderGroup[] = [
  {
    title: 'Physics & Simulation',
    loaders: [
      { name: 'Wave Physics', component: loading.WavePhysicsLoader, kebabName: 'wave-physics-loader' }
    ]
  },
  {
    title: 'Dots & Pulses',
    loaders: [
      { name: 'Pulse Dots', component: loading.PulseDots, kebabName: 'pulse-dots' },
      { name: 'Bounce Dots', component: loading.BounceDots, kebabName: 'bounce-dots' },
      { name: 'Liquid Dots', component: loading.LiquidDots, kebabName: 'liquid-dots' },
      { name: 'Fade Dots', component: loading.FadeDots, kebabName: 'fade-dots' },
      { name: 'Swapping Dots', component: loading.SwappingDots, kebabName: 'swapping-dots' },
      { name: 'Bouncing Dots', component: loading.BouncingDots, kebabName: 'bouncing-dots' },
      { name: 'Bobbing Dots', component: loading.BobbingDots, kebabName: 'bobbing-dots' },
      { name: 'Pulse Dot', component: loading.PulseDot, kebabName: 'pulse-dot' },
      { name: 'Wave Dots', component: loading.WaveDots, kebabName: 'wave-dots' },
      { name: 'Grid Dots', component: loading.GridDots, kebabName: 'grid-dots' },
      { name: 'Pulsating Dots', component: loading.PulsatingDots, kebabName: 'pulsating-dots' },
      { name: 'Triple Dot', component: loading.TripleDotSpinner, kebabName: 'triple-dot-spinner' },
      { name: 'Ripple Effect', component: loading.RippleEffect, kebabName: 'ripple-effect' },
      { name: 'Breathing Glow', component: loading.BreathingGlow, kebabName: 'breathing-glow' },
      { name: 'Apple Breathe', component: loading.AppleBreathe, kebabName: 'apple-breathe' },
      { name: 'Apple Pulse', component: loading.ApplePulseDots, kebabName: 'apple-pulse-dots' },
      { name: 'Smooth Shift', component: loading.SmoothDotShift, kebabName: 'smooth-dot-shift' },
      { name: 'Spring Matrix', component: loading.SpringDotMatrix, kebabName: 'spring-dot-matrix' },
      { name: 'Fluid Orbit', component: loading.FluidDotOrbit, kebabName: 'fluid-dot-orbit' },
      { name: 'Magnetic Dots', component: loading.MagneticDots, kebabName: 'magnetic-dots' },
      { name: 'Drop Dot', component: loading.DropDot, kebabName: 'drop-dot' },
      { name: 'Morph Ring', component: loading.MorphDotRing, kebabName: 'morph-dot-ring' },
      { name: 'Scale Pulse', component: loading.AppleScalePulse, kebabName: 'apple-scale-pulse' },
      { name: 'Trailing Dots', component: loading.TrailingDots, kebabName: 'trailing-dots' },
    ]
  },
  {
    title: 'Rings & Spinners',
    loaders: [
      { name: 'Classic Spinner', component: loading.ClassicSpinner, kebabName: 'classic-spinner' },
      { name: 'Ring Sweep', component: loading.RingSweep, kebabName: 'ring-sweep' },
      { name: 'Concentric Ring', component: loading.ConcentricRing, kebabName: 'concentric-ring' },
      { name: 'Dots Ring', component: loading.DotsRing, kebabName: 'dots-ring' },
      { name: 'Twin Orbit', component: loading.TwinOrbit, kebabName: 'twin-orbit' },
      { name: 'Comet Spinner', component: loading.CometSpinner, kebabName: 'comet-spinner' },
      { name: 'Swirling Spinner', component: loading.SwirlingSpinner, kebabName: 'swirling-spinner' },
      { name: 'Radar Sweep', component: loading.RadarSweep, kebabName: 'radar-sweep' },
      { name: 'Orbiting Dot', component: loading.OrbitingDot, kebabName: 'orbiting-dot' },
      { name: 'Orbiting Circles', component: loading.OrbitingCircles, kebabName: 'orbiting-circles' },
      { name: 'Intersecting Rings', component: loading.IntersectingRings, kebabName: 'intersecting-rings' },
      { name: 'Clock Spinner', component: loading.ClockSpinner, kebabName: 'clock-spinner' },
      { name: 'Gears', component: loading.Gears, kebabName: 'gears' },
      { name: 'Cross Spinner', component: loading.CrossSpinner, kebabName: 'cross-spinner' },
      { name: 'Line Spinner', component: loading.LineSpinner, kebabName: 'line-spinner' },
      { name: 'Square Spinner', component: loading.SquareSpinner, kebabName: 'square-spinner' },
      { name: 'Dual Arc', component: loading.DualArc, kebabName: 'dual-arc' },
      { name: 'Fade Arc', component: loading.FadeArc, kebabName: 'fade-arc' },
      { name: 'Dash Ring', component: loading.DashRing, kebabName: 'dash-ring' },
      { name: 'Arc Tracer', component: loading.ArcTracer, kebabName: 'arc-tracer' },
      { name: 'iOS Spinner', component: loading.IosSpinner, kebabName: 'ios-spinner' },
      { name: 'Smooth Ring', component: loading.SmoothRing, kebabName: 'smooth-ring' },
      { name: 'Morphing Ring', component: loading.MorphingRing, kebabName: 'morphing-ring' },
      { name: 'Spring Expand', component: loading.SpringRingExpand, kebabName: 'spring-ring-expand' },
      { name: 'Watch Spinner', component: loading.WatchSpinner, kebabName: 'watch-spinner' },
      { name: 'Gradient Arc', component: loading.GradientArc, kebabName: 'gradient-arc' },
      { name: 'Breathe Ring', component: loading.BreatheRing, kebabName: 'breathe-ring' },
      { name: 'Offset Rings', component: loading.OffsetRings, kebabName: 'offset-rings' },
      { name: 'Dashed Spiral', component: loading.DashedSpiral, kebabName: 'dashed-spiral' },
      { name: 'Haptic Ring', component: loading.HapticRing, kebabName: 'haptic-ring' },
    ]
  },
  {
    title: 'Bars & Waves',
    loaders: [
      { name: 'Bar Cascade', component: loading.BarCascade, kebabName: 'bar-cascade' },
      { name: 'Bouncing Bars', component: loading.BouncingBars, kebabName: 'bouncing-bars' },
      { name: 'Symmetric Wave', component: loading.SymmetricWave, kebabName: 'symmetric-wave' },
      { name: 'Bar Sweep', component: loading.BarSweep, kebabName: 'bar-sweep' },
      { name: 'Circular Bars', component: loading.CircularBars, kebabName: 'circular-bars' },
      { name: 'Accordion Loader', component: loading.AccordionLoader, kebabName: 'accordion-loader' },
      { name: 'Square Accordion', component: loading.SquareAccordion, kebabName: 'square-accordion' },
      { name: 'Conveyor Loop', component: loading.ConveyorLoop, kebabName: 'conveyor-loop' },
      { name: 'Bouncing Lines', component: loading.BouncingLines, kebabName: 'bouncing-lines' },
      { name: 'Siri Wave', component: loading.SiriWave, kebabName: 'siri-wave' },
      { name: 'Apple EQ', component: loading.AppleEqualizer, kebabName: 'apple-equalizer' },
      { name: 'Spring Bars', component: loading.SpringBars, kebabName: 'spring-bars' },
      { name: 'Fluid Bars', component: loading.FluidBars, kebabName: 'fluid-bars' },
      { name: 'Morphing Bars', component: loading.MorphingBars, kebabName: 'morphing-bars' },
      { name: 'Stacked Pulse', component: loading.StackedBarPulse, kebabName: 'stacked-bar-pulse' },
      { name: 'Waveform', component: loading.WaveformLoader, kebabName: 'waveform-loader' },
      { name: 'Elastic Bars', component: loading.ElasticBars, kebabName: 'elastic-bars' },
      { name: 'Sliding Bars', component: loading.SlidingBars, kebabName: 'sliding-bars' },
      { name: 'Sound Wave', component: loading.AppleSoundWave, kebabName: 'apple-sound-wave' },
    ]
  },
  {
    title: 'Geometric Shapes',
    loaders: [
      { name: 'Flip Square', component: loading.FlipSquare, kebabName: 'flip-square' },
      { name: 'Morphing Shape', component: loading.MorphingShape, kebabName: 'morphing-shape' },
      { name: "Newton's Cradle", component: loading.NewtonsCradle, kebabName: 'newtons-cradle' },
      { name: 'Spinning Squares', component: loading.SpinningSquares, kebabName: 'spinning-squares' },
      { name: 'Expanding Cross', component: loading.ExpandingCross, kebabName: 'expanding-cross' },
      { name: 'Square Grid', component: loading.SquareGrid, kebabName: 'square-grid' },
      { name: 'Floating Diamonds', component: loading.FloatingDiamonds, kebabName: 'floating-diamonds' },
      { name: 'Pulse Square', component: loading.PulseSquare, kebabName: 'pulse-square' },
      { name: 'Pendulum', component: loading.Pendulum, kebabName: 'pendulum' },
      { name: 'Hexagon Spinner', component: loading.HexagonSpinner, kebabName: 'hexagon-spinner' },
      { name: 'Wandering Cube', component: loading.WanderingCube, kebabName: 'wandering-cube' },
      { name: 'Hourglass', component: loading.Hourglass, kebabName: 'hourglass' },
      { name: 'Rotating Triangle', component: loading.RotatingTriangle, kebabName: 'rotating-triangle' },
      { name: 'Bouncing Square', component: loading.BouncingSquare, kebabName: 'bouncing-square' },
      { name: 'Breathing Square', component: loading.BreathingSquare, kebabName: 'breathing-square' },
      { name: 'Diamond Grid', component: loading.DiamondGrid, kebabName: 'diamond-grid' },
      { name: 'Square Snake', component: loading.SquareSnake, kebabName: 'square-snake' },
      { name: 'Infinity Path', component: loading.InfinityPath, kebabName: 'infinity-path' },
      { name: 'Morphing Infinity', component: loading.MorphingInfinity, kebabName: 'morphing-infinity' },
      { name: 'Zig Zag Pulse', component: loading.ZigZagPulse, kebabName: 'zig-zag-pulse' },
      { name: 'Pumping Heart', component: loading.PumpingHeart, kebabName: 'pumping-heart' },
      { name: 'Heartbeat', component: loading.Heartbeat, kebabName: 'heartbeat' },
      { name: 'Spiral Spinner', component: loading.SpiralSpinner, kebabName: 'spiral-spinner' },
      { name: 'Concentric Squares', component: loading.ConcentricSquares, kebabName: 'concentric-squares' },
      { name: 'Rotating Cross', component: loading.RotatingCross, kebabName: 'rotating-cross' },
      { name: 'Icon Morph', component: loading.AppleIconMorph, kebabName: 'apple-icon-morph' },
      { name: 'Smooth Square', component: loading.SmoothRoundedSquare, kebabName: 'smooth-rounded-square' },
      { name: 'Cube Flip', component: loading.CubeFlipSpring, kebabName: 'cube-flip-spring' },
      { name: 'Origami', component: loading.OrigamiShape, kebabName: 'origami-shape' },
      { name: 'Diamond Spin', component: loading.DiamondRotateSpring, kebabName: 'diamond-rotate-spring' },
      { name: 'Shape Shift', component: loading.ShapeShiftGrid, kebabName: 'shape-shift-grid' },
      { name: 'Spring Hex', component: loading.SpringHexagon, kebabName: 'spring-hexagon' },
      { name: 'Elastic Square', component: loading.ElasticSquare, kebabName: 'elastic-square' },
      { name: 'Minimal Triangle', component: loading.MinimalTriangle, kebabName: 'minimal-triangle' },
      { name: 'Fluid Diamond', component: loading.FluidDiamond, kebabName: 'fluid-diamond' },
    ]
  },
  {
    title: 'Text & Interface',
    loaders: [
      { name: 'Text Shimmer', component: loading.TextShimmer, kebabName: 'text-shimmer' },
      { name: 'Text Blink', component: loading.TextBlink, kebabName: 'text-blink' },
      { name: 'Text Dots', component: loading.TextDots, kebabName: 'text-dots' },
      { name: 'Text Shimmer Wave', component: loading.TextShimmerWave, kebabName: 'text-shimmer-wave' },
      { name: 'Typing Indicator', component: loading.TypingIndicator, kebabName: 'typing-indicator' },
      { name: 'Typing', component: loading.Typing, kebabName: 'typing' },
      { name: 'Shimmer Line', component: loading.ShimmerLine, kebabName: 'shimmer-line' },
      { name: 'Skeleton', component: loading.SkeletonLoader, kebabName: 'skeleton-loader' },
      { name: 'Terminal', component: loading.TerminalLoader, kebabName: 'terminal-loader' },
      { name: 'Text Reveal', component: loading.AppleTextReveal, kebabName: 'apple-text-reveal' },
      { name: 'Fluid Skeleton', component: loading.FluidSkeleton, kebabName: 'fluid-skeleton' },
      { name: 'Spring Pop', component: loading.SpringTextPop, kebabName: 'spring-text-pop' },
      { name: 'Apple Unlock', component: loading.AppleUnlock, kebabName: 'apple-unlock' },
      { name: 'Glass Card', component: loading.GlassmorphicCard, kebabName: 'glassmorphic-card' },
      { name: 'Mac Terminal', component: loading.MacTerminal, kebabName: 'mac-terminal' },
      { name: 'Dynamic Island', component: loading.DynamicIsland, kebabName: 'dynamic-island' },
      { name: 'App Icon', component: loading.AppIconLoad, kebabName: 'app-icon-load' },
      { name: 'Text Morph', component: loading.TextMorph, kebabName: 'text-morph' },
      { name: 'Face ID', component: loading.FaceIdScan, kebabName: 'face-id-scan' },
    ]
  }
];
