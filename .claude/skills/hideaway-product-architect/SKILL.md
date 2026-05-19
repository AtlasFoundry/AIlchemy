---
name: hideaway-product-architect
description: Hideaway's product doctrine, diagnostic model, and routing logic. Load when proposing or changing user-facing tools, writing system prompts for Prompt Lab / Builder Brief / future tools, making commercial decisions (pricing, packaging, free vs paid), or mapping a diagnostic outcome to a product. Not required for CSS, bug fixes, or infrastructure work.
---

# Hideaway Product Architect

This skill teaches the project logic. It does not duplicate the diagnostic data — that lives in `src/content/memo/`. The skill's job is to interpret the diagnostic, hold the product doctrine, and set decision standards for everything built on top.

## Product doctrine

Hideaway is a diagnostic-led thinking studio for makers, founders, and operators who think for a living.

**It is not:**
- A prompt marketplace
- A generic AI assistant
- A content library or productivity app

**It is:**
- A routed system that identifies where a maker is stuck and points them at the right intervention
- A studio for thinking work — capture, ideation, decision support, build briefing, release, iteration
- A place where the user's instinct compounds with use, rather than where they become dependent on the tool

**Who it is for:**
Makers, founders, indie operators, consultants, and creative professionals who use AI as one input in serious thinking work. The product is shaped for this group — operators whose primary job is thinking and deciding — without being closed to others who find it useful.

## The diagnostic model

The Makers Memo is the routing engine. Source of truth: `src/content/memo/`.

- **Stages:** Download → Idea → Creation (`stages.json`)
- **Subdomains:** 12 total, four per stage (`subdomains.json`)
- **Questions:** 36 total, three per subdomain (`questions.json`)
- **Patterns:** 8 maker patterns detected from score profiles (`patterns.json`)
- **Routing:** every question maps to a `resourceTag` and a `resourceTypeNeeded` framed in COM-B terms — Capability, Opportunity, or Motivation (`resource-routing.json`)

Read those files when reasoning about diagnostic logic. Do not restate or reinvent their content.

## Routing principles

When a maker scores low in a subdomain, the route is determined by the COM-B dimension of the specific question, not the stage label:

- **Capability gap** → guide, walkthrough, or framework. User needs knowledge or skill scaffolding.
- **Opportunity gap** → template, tool, prompt pack, or system. User needs infrastructure.
- **Motivation gap** → reflection, reframe, or short essay. User needs a shift in how they relate to the behaviour.

**Subdomain-level routing is sharper than stage-level.** "Low Creation" is too vague to act on. "Low Translation Into Action" (a Creation subdomain) is specific enough to route.

## The resource taxonomy

Resources sit on a commercial ladder:

- **Free guide / lead magnet** — captures attention, builds trust, demonstrates method. One per major subdomain over time.
- **Paid pack** — actionable kit for one specific friction. Priced for impulse purchase by an operator who wants the problem solved now.
- **Signature tool** — interactive, productised projection of routing logic (Prompt Lab, Builder Brief, future tools). Subscription value lives here.
- **Pathway kit** — bundled set of resources that walks a maker through an entire stage transition (e.g. Idea → Creation). Higher commitment, higher value.

Default position: most new resources start as free guides or paid packs. Tools and pathways are earned, not assumed.

## The Kitchen

The Kitchen is the soft-entry workspace where Hideaway's tools live. Operators arrive here when they already have something to work on and want the right next tool. Tools sit inside it as stations.

The Kitchen is not a replacement for the Makers Memo. The two serve different jobs:

- **Makers Memo** — the formal diagnostic. For operators who want to understand the whole pattern of how they work.
- **The Kitchen** — the soft entry. For operators who have rough material in hand and want to act on it. Routes them to the relevant tool.

Both are valid entry routes into Hideaway. They do not compete.

### Soft-routing questions

The Kitchen routes operators in maker language rather than diagnostic language. The four entry questions map to diagnostic stages:

- **What have you got cooking?** → Download / raw capture / early material
- **What's half-baked?** → Idea / pressure-testing / shaping
- **What's ready to build?** → Creation / Translation Into Action / Builder Brief
- **What needs tasting?** → Completion, release, iteration / future critique tools

These are not a second diagnostic. They are an operator-voice surface over the same routing logic already encoded in `src/content/memo/`. The Kitchen should make routing feel natural, not analytical.

## Tools as projections

Every user-facing tool must be traceable to a routing node it serves. Tools are also stations inside The Kitchen — they remain productised projections of diagnostic routing nodes, but The Kitchen makes that routing visible and usable for operators.

- **Prompt Lab** — general-purpose, serves the broad "sharpen what you ask AI" job. Loosely anchored to Translation Into Action and Tool Fluency.
- **Builder Brief Generator** — shipped. Serves Translation Into Action as the felt user-facing friction, anchored on Tool Fluency as the secondary Opportunity gap that justifies the tool format. Takes a rough idea and produces a structured build brief with an AI-build-ready prompt as the headline artefact.
- **Future tools** — must name the subdomain they serve before being built.

If a proposed tool cannot be traced to a routing node, it does not belong in Hideaway.

## The bridge from `resourceTag` to product

`src/content/memo/resource-routing.json` names tags like `translation-action`, `concept-formation`, `capture-system`. The bridge from these tags to specific products is not yet codified.

For now, treat it as principle:

- One tag may map to multiple resource formats (a guide and a tool).
- One product may serve multiple tags (Builder Brief serves Translation Into Action primarily, but also touches Tool Fluency).
- Codify the bridge into a `routing-map.json` only when projection logic has stabilised through real product decisions. Until then, reason from first principles each time and document the decision in the commit message.

## Decision standards

When proposing or changing a Hideaway product, answer these in order:

1. **Which subdomain does this serve?** Name it explicitly. If you can't, the change does not belong.
2. **Which routing logic does it support?** Capability, Opportunity, or Motivation gap? Or pattern-specific?
3. **What is the commercial use case?** Free lead, paid pack, signature tool, or pathway? At what price point or tier?
4. **What is the smallest viable next build?** Strip away everything not required for the first usable version.

If a decision can't be defended against these four questions, it is premature.

## Rule for user-facing system prompts

System prompts for user-facing tools (Prompt Lab, Builder Brief, future) must:

1. Reference the relevant Skill section when written.
2. Be checked against the doctrine before implementation.
3. Be updated *after* the Skill, not before — if doctrine shifts, the Skill changes first, then the tool's system prompt.

The Skill is the source of truth. Tools follow.

## Open product decisions

Decisions reasoned through against the doctrine but not yet shipped. Append-only. Remove an entry when the work ships, or promote it into the Skill as embedded doctrine if it set a precedent.

**Shipped:** Builder Brief Generator — 2026-05-19. First signature-tool projection of the Translation Into Action / Tool Fluency pathway. The Builder Brief dependency referenced in the Pressure-Test decision is now resolved; the Pressure-Test Pack remains queued as a paid-pack decision.

### Pressure-Test (Idea → Pressure Testing)

- **Subdomain served:** `idea_pressure_testing`.
- **Format:** Paid pack first, not a signature tool.
- **Scope:** Three structured lenses — validation, competitive mapping, purpose challenge. Plus a short written reframe to cover the I04 motivation gap, which a tool alone cannot serve.
- **Sequencing:** Do not build before Builder Brief ships. Builder Brief is the next signature tool commitment (Translation Into Action) and must be completed first to honour the planned roadmap and avoid feature inflation.
- **Future upgrade path:** Promote to a signature tool only if pack demand justifies it. The tool version would extend `enhance-prompt.js` via a `mode` parameter.
- **Logged:** 2026-05-19
