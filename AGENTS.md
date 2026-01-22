# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Nuxt application source (components, pages, composables, stores, utils, assets).
- `server/`: Server routes, middleware, and plugins for SSR/runtime logic.
- `public/`: Static assets served as-is.
- `i18n/`: Locale messages and i18n configuration data.
- `test/`: Vitest suites (`test/nuxt` for UI/unit, `test/e2e` for headless API E2E).
- `playwright/`: Browser E2E specs and fixtures; config in `playwright.config.ts`.
- Config/root: `nuxt.config.ts`, `vitest.config.ts`, `tsconfig.json`, `ecosystem.config.cjs`.

## Build, Test, and Development Commands
- `yarn dev`: Run the Nuxt dev server (clears `/tmp/nitro` first).
- `yarn build`: Production build using `.env.prod`.
- `yarn build:test`: Build using `.env` for staging-like checks.
- `yarn preview`: Serve the production build locally.
- `yarn test`: Run all Vitest projects.
- `yarn test:nuxt` / `yarn test:unit`: Run UI/nuxt or unit-only suites.
- `yarn test:e2e`: Headless E2E against a real backend (`RUN_E2E=1`).
- `yarn pw:install`: Install Playwright browsers; then use `yarn test:pw`.

## Coding Style & Naming Conventions
- Formatting uses Prettier (`.prettierrc.json`): 2 spaces, single quotes, semicolons, `printWidth` 120.
- Vue SFCs use no semicolons; keep `<script>` and `<style>` indented (`vueIndentScriptAndStyle`).
- TypeScript is preferred for app logic; keep filenames descriptive and kebab-case for Vue files.

## Testing Guidelines
- Frameworks: Vitest for unit/nuxt tests, Playwright for browser E2E.
- Naming: `*.nuxt.spec.ts` for Nuxt/UI tests, `*.e2e.ts` for headless E2E.
- Run targeted suites with `yarn test:nuxt`, `yarn test:unit`, or `yarn test:e2e`.

## Commit & Pull Request Guidelines
- Commits follow a conventional style like `feat(scope): summary` or `fix(scope): summary`.
- Keep messages short, present tense, and scoped (e.g., `fix(auth): handle redirect`).
- PRs should include: a clear description, test results, and screenshots for UI changes.
- Link related issues and note any environment changes (`.env`, `NUXT_*`).

## Configuration & Deployment Notes
- Start from `.env.example`; do not commit secrets. Use `.env.prod` for builds.
- `deploy.sh` requires `GITHUB_TOKEN` and pushes `.output/` to the `web` branch.
