# UX Profile Engine

A centralized UX Profile system supporting 7 named visual behavior presets, switchable at runtime.

## UX Profiles

The system supports the following profiles:
- **Clean Core**: Minimalist, layout-only motion, no heavy effects.
- **Quantum Slate**: Balanced, ambient orbs, border traces, staggered animations.
- **Neural Flow**: Neural network background, node pulsing, floating cards.
- **Aurora Pulse**: Large ambient waves, color shifts, soft card tilts.
- **Cyber Matrix**: Cyber grid overlay, matrix rain (dark mode only), high glow.
- **Holographic Flux**: Chromatic splits, glass fragments, glitch borders.
- **Sentient Canvas**: Floating AI silhouettes, slow drifts, low opacity backgrounds.

## Adding New Profiles

1. Open `src/config/uxProfiles.ts`.
2. Add the new profile name to the `UXProfileName` type.
3. Add the new profile configuration to the `uxProfiles` object, ensuring all flags are defined according to the `UXProfileConfig` interface.
4. The new profile will automatically appear in the `ProfileSelector` dropdown.

## Architecture

- **`src/config/uxProfiles.ts`**: Centralized configuration mapping profile names to behavior flags.
- **`src/context/UXProfileContext.tsx`**: React Context providing the active profile and theme state to the application.
- **`src/components/ProfileSelector.tsx`**: UI control for switching the active profile and toggling dark mode.
- **`src/components/CardItem.tsx`**: Card component that reacts to profile flags (tilt, glow, border trace).
- **`src/components/CardGrid.tsx`**: Grid component that reacts to profile flags (stagger, compact mode).
- **`src/components/HeroSection.tsx`**: Hero section that reacts to profile flags (animation intensity).
- **`src/components/AmbientLayer.tsx`**: Background layer that renders complex visual effects based on profile flags using HTML5 Canvas and CSS animations.

## Visual Behavior System

The visual behavior system is driven entirely by the active UX profile. Components read the active profile from the context and conditionally apply styles, animations, and effects. This ensures that the application can drastically change its appearance and behavior without duplicating logic or relying on complex component state.
