# Copilot Instructions for Soft But Savage: The ShaiCandie Rebirth Lounge™

## Project Overview
This is a React-based web app (Vite) designed as a healing and empowerment sanctuary for women. It features journaling, guided rituals, community spaces, audio content, and live coaching modules. The design emphasizes warmth, safety, and feminine empowerment.

## Architecture & Key Files
- All main UI components are in `src/` (e.g., `App.jsx`, `JournalEntries.jsx`, `Rituals.jsx`, `Community.jsx`, `UserAuth.jsx`).
- Entry point: `src/index.jsx`.
- Supabase is used for authentication and backend (see `src/supabaseClient.js`).
- Styles: `App.css`, `index.css`.
- Public assets (images, manifest, etc.): `public/`.
- Test files: `App.test.jsx`, `setupTests.js`.
- Vite config: `vite.config.js`.

## Developer Workflows
- **Start dev server:** `npm run dev` (see Vite config)
- **Run tests:** `npm test` (Jest, see `setupTests.js`)
- **Build for production:** `npm run build`
- **Export assets:** `scripts/export-assets.sh` (for deployment)

## Patterns & Conventions
- Use functional React components and hooks (no class components).
- State management is local (React hooks); no Redux or MobX.
- Supabase handles user auth and data storage—interact via `supabaseClient.js`.
- Community features and journaling are modular: each has its own component and state.
- Follow the journal-inspired, soft-glow aesthetic in all UI changes.
- Use semantic, accessible HTML and ARIA roles where possible.
- Keep all user-facing text and prompts gentle, supportive, and on-brand.

## Integration Points
- **Supabase:** All backend/auth logic is in `src/supabaseClient.js`.
- **Audio:** Audio features are handled in dedicated components (see Audio Sanctuary section in README).
- **Community:** Social features are in `Community.jsx`.

## Examples
- To add a new ritual: create a new component in `src/`, import it in `App.jsx`, and follow the style of `Rituals.jsx`.
- To add a new API call: extend `supabaseClient.js` and use hooks in the relevant component.

## References
- See `README.md` for feature and brand context.
- For new features, match the tone and structure of existing components.

---

For questions, review the README or existing components for patterns before introducing new dependencies or approaches.
