# JSON Forms Nuxt UI Showcase

[![Vue 3](https://img.shields.io/badge/Vue%203-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Nuxt 3](https://img.shields.io/badge/Nuxt%204-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.com)
[![Nuxt UI v3](https://img.shields.io/badge/Nuxt%20UI%20v3-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Nuxt UI v3 + JSON Forms — Interactive Showcase & Live Playground**

A comprehensive, production-ready showcase of [JSON Forms](https://jsonforms.io/) integrated with [Nuxt UI v3](https://ui.nuxt.com). Features 87+ real-world examples spanning basic controls, complex data structures, dynamic layouts, combinators, and edge cases — all with a live, editable playground.

---

## Features

| # | Feature | Description |
|---|---------|-------------|
| 🎨 | **Dynamic Theme & Color Picker** | Change primary/neutral colors and radius in real time — logo, favicon, and all components react instantly |
| ⚡ | **Live Interactive Editor** | Edit JSON Schema & UI Schema inline with instant re-render and validation feedback |
| 📐 | **Resizable Panel Layout** | Drag-to-resize splitter between the live form and the playground editor |
| 🧩 | **87+ Complete Examples** | Basic controls, enums, complex widgets (sliders, ratings, color pickers), layouts (vertical, horizontal, groups, tabs, steppers), combinators (oneOf/anyOf/allOf/if-then-else), arrays (nested, reorderable, detail panels), and edge-case bug scenarios |
| 🔍 | **Searchable Sidebar** | Sticky sidebar with category groups, search, and collapsible navigation |
| 🛠️ | **Custom Renderers** | Full set of custom JSON Forms renderers: OneOf/AnyOf tabbed selection, date pickers, rating stars, slider, color picker, radio groups, multi-string arrays, categorization stepper |
| 🌙 | **Dark Mode** | Full dark mode support with system preference detection |

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Nuxt 4](https://nuxt.com) |
| UI Library | [Nuxt UI v3](https://ui.nuxt.com) — `@nuxt/ui` |
| Forms Engine | [JSON Forms](https://jsonforms.io) — `@jsonforms/core` & `@jsonforms/vue` |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Icons | [Iconify](https://iconify.design) — Lucide & Simple Icons |
| Package Manager | [pnpm](https://pnpm.io) |

## Project Structure

```
jsonforms-nuxtui/
├── app/
│   ├── app.config.ts          # Nuxt UI theme config (primary, neutral, radius)
│   ├── app.vue                # Root layout
│   ├── assets/css/main.css    # Global CSS
│   ├── components/
│   │   ├── jsonforms/         # JSON Forms custom renderers
│   │   │   ├── controls/      #   Text, Number, Boolean, Date, Enum, Slider, Rating, etc.
│   │   │   ├── layouts/       #   Vertical, Horizontal, Group, Categorization
│   │   │   ├── JsonFormsNuxt.vue
│   │   │   └── renderers.ts   #   Renderer registry
│   │   └── showcase/          # Showcase UI components
│   │       ├── ThemePicker.vue
│   │       ├── SidebarNavigation.vue
│   │       ├── PlaygroundPanel.vue
│   │       └── AppLogo.vue
│   ├── data/examples/
│   │   └── index.ts           # 87+ example schemas, UI schemas, and data
│   └── pages/
│       └── showcase/
│           ├── index.vue      # Landing page
│           └── [example].vue  # Dynamic example page with playground
├── public/
│   └── favicon.ico
├── nuxt.config.ts
├── package.json
├── tsconfig.json
└── LICENSE
```

## Architecture

The application follows a three-panel layout:

1. **Sidebar** — Category-grouped, searchable example list with sticky positioning
2. **Live Form** — The active JSON Forms instance rendered with Nuxt UI v3 components
3. **Playground** — CodeMirror-based editors for JSON Schema, UI Schema, and form data; changes propagate instantly to the live form

Each example in `app/data/examples/index.ts` is a self-contained triplet of `{ schema, uischema, data }`. Selecting an example loads it into the form and playground editors simultaneously.

## CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs lint and type-check on every push.

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
