# Daily Wordle

A daily Wordle clone built with React, TypeScript, and Vite. A new 5-letter word is fetched from an external API each day — the same word persists for the full day via localStorage caching.

## Features

- Daily word fetched from [random-word-api.vercel.app](https://random-word-api.vercel.app) — same word all day, refreshes at midnight
- Full Wordle mechanics: type letters, Backspace to delete, Enter to submit a row
- Colour-coded feedback: green (correct position), yellow (wrong position), grey (not in word)
- On-screen keyboard with Enter and Backspace support
- Win / fail result dialog showing the correct answer if you run out of guesses
- Leaderboard page (mock data)
- Deployed automatically to GitHub Pages on every push to `main`

## Tech Stack

| Concern         | Library                      |
| --------------- | ---------------------------- |
| UI              | React 19 + TypeScript        |
| Routing         | React Router 7               |
| Data fetching   | TanStack Query 5             |
| Build           | Vite 7                       |
| Testing         | Vitest + Testing Library     |
| Linting         | ESLint 9 + typescript-eslint |
| Formatting      | Prettier 3                   |
| Package manager | pnpm                         |

## Architecture Overview

The project uses **feature/domain-based** organisation — each top-level folder under `src/` owns its own components, styles, and logic.

```
src/
├── App.tsx               # Router setup
├── main.tsx              # React root + QueryClientProvider
├── types.ts              # Shared TypeScript types (GameState, TileStatus, …)
├── index.css             # Global CSS custom properties and utility classes
│
├── AppLayout/            # Shell layout (Outlet wrapper)
├── Home/                 # Landing page with navigation links
├── Leaderboard/          # Scores page
│
├── Play/                 # Wordle game feature
│   ├── Play.tsx          # Page — fetches the word, renders loading/error/game
│   ├── Play.module.css
│   ├── context/
│   │   └── GameContext.tsx   # useReducer-based game state + useGame() hook
│   ├── components/
│   │   ├── GameBoard/    # Wires keyboard events → context, renders sub-components
│   │   ├── Guesses/      # 6×5 tile grid
│   │   ├── Keyboard/     # On-screen keyboard (letter + Enter + Backspace keys)
│   │   └── GameResult/   # Win/fail dialog
│   └── utils/
│       └── constants.ts  # KEYBOARD_LAYOUT
│
└── shared/               # Cross-feature utilities
    ├── api/
    │   └── wordApi.ts    # fetchWordOfTheDay() — fetch + localStorage daily cache
    ├── hooks/
    │   └── useWordOfTheDay.ts  # TanStack Query wrapper
    ├── gameLogic.ts      # Pure functions: initGameState, addLetter, deleteLetter, submitGuess
    ├── className.ts      # Re-exports `classnames` as `cn`
    ├── dateTime.ts       # isSameDate helper
    └── words.ts          # wordOfTheDay() fallback + 700-word list
```

### Separation of concerns

- **Rendering** — React components under each feature folder
- **Business logic** — pure functions in `shared/gameLogic.ts` (no React dependency)
- **App state** — `GameContext` (`useReducer` + `dispatch`) inside `Play/context/`
- **Data fetching** — async function in `shared/api/wordApi.ts`, consumed via `useWordOfTheDay` hook (TanStack Query), called only in the `Play` page component

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Run tests
pnpm test

# Type-check
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format

# Run all checks (typecheck + lint + format + dead code)
pnpm check-all
```

## CI / CD

Every push triggers the GitHub Actions workflow (`.github/workflows/verify-and-deploy.yml`):

1. **verify** — `typecheck`, `lint`, `lint-fmt`, `depcheck` (runs in parallel with test)
2. **test** — `vitest`
3. **build** — `tsc -b && vite build`, uploads GitHub Pages artifact
4. **deploy** — deploys to GitHub Pages (pushes to `main` or manual trigger only)

Live site: `https://<org>.github.io/m8_react/`
