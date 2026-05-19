# Hideaway

A diagnostic-led thinking studio for makers.

Hideaway is not a prompt marketplace, a generic AI assistant, or a content library. It is a routed thinking system: a diagnostic identifies where a maker is stuck, and routes them to the resource — guide, tool, prompt, brief, or pathway — that fits the friction.

This file enforces how the project is built. The product logic itself lives in `.claude/skills/hideaway-product-architect/SKILL.md`.

## Stack

- **Framework:** Astro 5
- **Language:** Plain JavaScript / TypeScript, no React or Vue layered on top
- **Server functions:** Netlify Functions using exported handler functions. The project uses `"type": "module"` in package.json, so prefer ES module syntax unless an existing file clearly uses CommonJS.
- **AI calls:** Anthropic Messages API, called from Netlify functions
- **Diagnostic data:** Structured JSON in `src/content/memo/`
- **Content:** Astro content collections for posts

## Architectural layers

The project has two layers that must remain distinct:

**Layer 1 — Internal operating layer (this file + the Skill).**
Teaches Claude Code and future builders how Hideaway works as a product. Not user-facing. Compounds as more doctrine is captured.

**Layer 2 — User-facing tools.**
Pages in `src/pages/` and Netlify functions in `netlify/functions/`. Each tool is a productised projection of the internal layer. Prompt Lab, the diagnostic itself, and future tools like Builder Brief sit here.

**Rule:** System prompts for user-facing tools must be derived from the Skill and checked against it before implementation. The Skill is the source of truth. When doctrine changes, update the Skill first, then update the tool's system prompt.

## Build discipline

Every build session must follow this:

1. **Inspect before editing.** Read the relevant files. Understand the current structure.
2. **Explain current structure before proposing changes.** Name what exists and how it works.
3. **Propose the smallest viable change.** Resist scope creep. Resist refactoring for its own sake.
4. **Preserve existing data contracts and UI behaviour** unless explicitly changing them. The JSON shape returned by `enhance-prompt.js`, the localStorage keys, the diagnostic JSON schemas — all are contracts.
5. **No new dependencies without a clear reason.** Hideaway runs on Astro + Netlify alone deliberately.
6. **Plan before editing.** For anything non-trivial, propose the plan first. Show the file list. Show the risks. Wait for approval.
7. **Flag risks before structural changes.** Schema changes, routing changes, function signature changes — flag them and ask.

This applies whether the work is product, copy, code, or content.

## Key files map

- `src/content/memo/` — diagnostic data (stages, subdomains, questions, patterns, resource routing). Source of truth for the diagnostic model.
- `src/pages/diagnostic.astro` — the Makers Memo diagnostic UI.
- `src/pages/prompt-lab.astro` — Prompt Lab UI.
- `netlify/functions/enhance-prompt.js` — current Netlify function for Prompt Lab. Preferred future pattern: extend user-facing AI tools through a `mode` parameter and shared function structure where possible. Do not create parallel functions unless the request/response shape or product shell genuinely needs to differ.
- `src/layouts/BaseLayout.astro` — shared layout. Shared CSS variables live here.
- `src/components/` — Nav, Footer, EmailSignup, PostCard. Reuse these. Do not duplicate.
- `.claude/skills/hideaway-product-architect/SKILL.md` — product doctrine, routing logic, decision standards. Read before proposing product changes.

## How to use the Skill

Load `.claude/skills/hideaway-product-architect/SKILL.md` before:
- Proposing a new user-facing tool
- Writing or changing a system prompt for a user-facing tool
- Making a commercial decision (pricing, packaging, what is free vs paid)
- Mapping a diagnostic outcome to a product or resource

For non-product work — CSS, bug fixes, copy edits, infrastructure — the Skill is not required.

## Commands

```bash
npm run dev           # Astro dev server
npm run dev:netlify   # Netlify dev (includes functions)
npm run build         # Production build
npm run preview       # Preview build
```
