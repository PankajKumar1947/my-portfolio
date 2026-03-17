---
name: frontend-design
description: Guidelines for creating distinctive, production-grade interfaces avoiding "AI slop" aesthetics, tailored for the portfolio's Navy/Orange and VS Code theme.
---

# Frontend Design Pattern

This skill guides the creation of high-end, memorable interfaces for the portfolio. It prioritizes intentionality over generic patterns, leveraging the project's specific design system.

## 🎨 Project Design System

### Light Mode: "Command & Vibrant"
- **Background:** `--background` (#eef0f4) - Soft, clean grey-blue.
- **Primary:** `--primary` (#003566) - Deep Navy.
- **Accent:** `--accent` (#faa40b) - Vibrant Orange.
- **Feel:** Professional yet energetic, editorial layout style.

### Dark Mode: "VS Code Classic"
- **Background:** `--background` (#1e1e1e) - Deep charcoal.
- **Card/Sidebar:** `--card` (#252526).
- **Primary:** `--primary` (#007acc) - Material Blue.
- **Feel:** Industrial, utilitarian, dev-focused.

## 🛠️ Aesthetic Pillars

### 1. Typography (Geist Mono & Sans)
Avoid system-font-slop. Use the project's Geist configuration.
- **Headings:** Use `--font-heading` with tight `tracking-tight` and `font-bold`.
- **Code/Meta:** Use `--font-code` (Geist Mono) for slugs, dates, and technical details.

### 2. Motion & Interaction
Motion should feel organic and premium.
- **Library:** Use `motion` (Framer Motion).
- **Standard Transitions:** Use `--ease-smooth` or `--ease-spring` for animations.
- **Entry Animations:** Prioritize staggered reveals for page content.
- **Micro-interactions:** Subtle hover lifts (`.hover-lift`) and scale resets (`active:scale-[0.98]`).

### 3. Spatial Composition
- **Negative Space:** Don't crowd components. Use `space-y-6` as a default container spacing.
- **Grid-Breaking:** Use asymmetric layouts and overlapping elements where appropriate.
- **Containers:** Use `.glass` effect for semi-transparent layers in light mode.

## 🚀 Implementation Guidelines

### Customizing Shadcn
NEVER use default Shadcn styles as-is. Always apply project-specific tokens:
```tsx
// Example of a customized card
<Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-card-hover">
  <CardHeader>
    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary">
      {title}
    </h3>
  </CardHeader>
</Card>
```

### Motion Patterns
```tsx
import { motion } from "motion/react";

export function PremiumSection({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} // smooth ease
    >
      {children}
    </motion.div>
  );
}
```

## 🚫 Strict Design Rules

### 1. No Hardcoded Colors or Shadows
NEVER use hex (`#ffffff`), RGB (`rgb(...)`), or HSL (`hsl(...)`) values directly in your components or utility classes. 

- **Colors:** Use Tailwind classes that map to variables (e.g., `text-primary`, `bg-background`, `border-border/50`).
- **Shadows:** Use the custom shadow tokens: `shadow-card`, `shadow-card-hover`, `shadow-glow`.
- **Spacing:** Use the spacing scale variables or standard Tailwind spacing classes (e.g., `space-y-6`, `p-shell`).

### 2. VS Code Theme Compliance
All admin components MUST comply with the dark mode "VS Code Classic" tokens. Use `--sidebar-*` and `--card` variables for surface background colors to ensure a cohesive IDE-like experience.

## 🚫 What to Avoid (AI Slop Check)
- **Generic Fonts:** No Inter, Arial, or Roboto unless fallback.
- **Purple Gradients:** Avoid the "AI purple" cliché unless it's a specific brand requirement.
- **Predictable Shadows:** Use the custom `--shadow-card` and `--shadow-glow` rather than default `shadow-md`.
- **Default Spacing:** Avoid `p-4` everywhere; use the spacing scale `--space-*`.

## 💎 Refinement List
- [ ] Stagger content entrance.
- [ ] Add grain or noise textures to backgrounds for depth.
- [ ] Ensure hover states are distinct and reactive.
- [ ] Check dark mode contrast for VS Code compliance.
