# Brand Identity & UI Design System

You are tasked with developing a website based on the following brand guidelines. The visual style is based on a **pixel/grid-based aesthetic** with a vibrant, modern color palette.

## 1. Core Color Palette (Web-ready)
*Note: CMYK values are primary sources. HEX values are approximations for web implementation.*

| Color Name | CMYK Reference | Target HEX (approx) | Role in UI |
| :--- | :--- | :--- | :--- |
| **Brand Green** | 75, 15, 100, 0 | `#4CAF50` | Primary Brand Color, Success states |
| **Light Green** | 44, 0, 95, 0 | `#8BC34A` | Accents, Call-to-action (CTA) |
| **Brand Orange** | 0, 70, 100, 0 | `#FF5722` | Attention, Warnings, Interaction |
| **Light Orange** | 0, 30, 45, 0 | `#FFCC80` | Secondary accents, hover states |
| **Violet** | 70, 100, 10, 0 | `#673AB7` | Secondary branding, Deep accents |
| **Light Violet** | 30, 60, 10, 0 | `#B39DDB` | Decorative elements |
| **Blue (Azure)** | 85, 40, 25, 0 | `#03A9F4` | Links, Informational components |
| **Turquoise** | 50, 0, 25, 0 | `#4DB6AC` | Complementary UI details |

## 2. Category Color Mapping
Apply specific colors to the following logical modules/sections of the site:

* **Green (Primary):** Main Logo, General sections, Outdoor signs/locations.
* **Orange:** Stationery-related UI, Transport/Logistics, High-urgency notifications.
* **Violet/Purple:** Typography-heavy pages, Navigation menus, Client Profiles/Loyalty.
* **Blue/Cyan:** Documentation, Patterns/Backgrounds, Staff/Human Resources.

## 3. Visual Language & Patterns
* **Grid System:** The UI should lean into a square-grid or "pixelated" design.
* **Backgrounds:** Use the "Light" versions of the colors for soft backgrounds or "pixel-stretch" patterns (shades of the same hue arranged in a non-linear grid).
* **Typography:** Clear, modern sans-serif. Use high-contrast White/Black text on the vibrant brand blocks.

## 4. Implementation Goals
1.  Use CSS variables for the entire palette.
2.  Ensure high accessibility (WCAG) when overlaying white text on Brand Green and Violet.
3.  Implement a "Grid/Tile" layout for the main landing page, mirroring the category structure of the brand book.