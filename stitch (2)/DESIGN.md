```markdown
# Design System Specification: The Kinetic Monolith

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **The Kinetic Monolith**. In an AI-powered code editor, the UI should not feel like a collection of static boxes, but rather a singular, high-performance instrument that feels carved from a dark obsidian glass.

We move beyond the "standard IDE" by rejecting rigid, high-contrast grids. Instead, we use **Tonal Continuity** and **Intentional Asymmetry**. The layout should feel dense yet breathable, using depth and subtle motion to guide the developer’s focus. By layering surfaces rather than boxing them in, we create a premium, editorial experience that feels as sophisticated as the AI driving it.

---

## 2. Color & Surface Architecture
The color palette is rooted in deep, atmospheric neutrals, punctuated by high-energy electric accents.

### Surface Hierarchy & Nesting
This system strictly follows the **"No-Line" Rule**. Traditional 1px solid borders are prohibited for sectioning. Boundaries are defined through background shifts and elevation tiers.

| Token | Hex | Role / Usage |
| :--- | :--- | :--- |
| `surface_container_lowest` | `#0E0E0E` | The "Basement." Use for the main editor gutter or inactive sidebars. |
| `surface` | `#131313` | The "Ground." The primary background for the code editor and terminal. |
| `surface_container_low` | `#1C1B1B` | The "Floor." Use for file trees and secondary navigation panels. |
| `surface_container` | `#201F1F` | The "Stage." Use for active tab backgrounds or input fields. |
| `surface_container_high` | `#2A2A2A` | The "Platform." Use for hovering elements or tooltips. |

### The "Glass & Gradient" Rule
To elevate the AI experience, the **AI Chat Panel** and **Command Palettes** must utilize Glassmorphism. 
- Use `surface_container_highest` (`#353534`) at 60% opacity with a `backdrop-blur` of 20px. 
- For Primary CTAs, use a signature gradient: `primary` (`#ADC6FF`) to `primary_container` (`#4B8EFF`) at a 135-degree angle to provide a "lithographic" soul.

---

## 3. Typography: Editorial Logic
We combine the humanist precision of **Inter** with the technical rigor of **JetBrains Mono**.

*   **Inter (UI/Headings):** Used for all structural elements. Headlines use a tighter tracking (-0.02em) to feel "engineered."
*   **JetBrains Mono (Code/Terminal):** Reserved strictly for code, line numbers, and terminal output. 

| Tier | Size | Weight | Token |
| :--- | :--- | :--- | :--- |
| **Display-MD** | 2.75rem | 700 | AI Hero states / Empty states |
| **Title-SM** | 1.0rem | 600 | Sidebar Headers / Panel Titles |
| **Label-MD** | 0.75rem | 500 | File Names / Tab Labels |
| **Body-SM** | 0.75rem | 400 | Terminal Text / Helper Text |

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** rather than structural lines.

*   **The Layering Principle:** A file tree (`surface_container_low`) sitting on the editor (`surface`) creates a natural 3D relationship. No divider is needed.
*   **Ambient Shadows:** For floating menus (e.g., autocomplete), use an extra-diffused shadow: `offset-y: 12px`, `blur: 32px`, `color: rgba(0, 0, 0, 0.4)`. 
*   **The "Ghost Border":** If a separation is visually required for accessibility, use `outline_variant` (`#414755`) at **15% opacity**. This creates a suggestion of a border that vanishes into the background.

---

## 5. Components & Interface Patterns

### Code Editor Tabs
*   **Active:** `surface` background, `0.25rem` (4px) top-border in `primary`. No side borders.
*   **Inactive:** `surface_container_low`. Text color: `on_surface_variant`.
*   **Interaction:** On hover, the tab should shift to `surface_container` with a subtle `primary` glow.

### AI Chat Panel (The Signature Component)
The AI panel should feel like it is "hovering" over the code. 
*   **Background:** Glassmorphism (`surface_variant` at 70% + blur).
*   **Input Field:** Use `surface_container_highest`. Forbid borders. Use a `2.5` (0.5rem) padding scale.
*   **Response Bubbles:** Use `secondary_container` for AI responses to provide a "Cyber Purple" tint that distinguishes machine-generated content.

### Buttons & Chips
*   **Primary Button:** `primary` background with `on_primary` text. `md` (0.375rem) corner radius.
*   **Ghost Action:** No background, `primary` text. On hover, background becomes `primary` at 10% opacity.
*   **Chips:** Selection chips use `surface_container_high`. **Forbid dividers** between chips; use `1.5` (0.3rem) spacing.

### Sidebar Navigation & File Trees
*   **Spacing:** Use `2.5` (0.5rem) vertical padding for items to maintain high density without clutter.
*   **Selection State:** Instead of a full-row background change, use a `2px` vertical pill of `secondary` on the left edge and a subtle `surface_container` background shift.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use background color shifts to separate the Sidebar from the Editor.
*   **DO** use `JetBrains Mono` for all data-heavy labels (e.g., file sizes, line counts).
*   **DO** use the `lg` (0.5rem) rounding for AI-related components to make them feel more "organic" than the `DEFAULT` (0.25rem) code elements.

### Don't
*   **DON'T** use 1px solid white or grey borders to separate panels. Use the `surface` hierarchy.
*   **DON'T** use pure black (`#000000`) for backgrounds. Use `surface_container_lowest` (`#0E0E0E`) to maintain tonal depth.
*   **DON'T** use standard "drop shadows." Use the Ambient Shadow spec with tinted opacities.
*   **DON'T** use dividers in lists. Use `0.4rem` (2) spacing increments to create clear visual groups.