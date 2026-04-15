---
title: "The prompt I use to extract insights from PDFs"
category: prompt
summary: "The exact prompt that powers The Atlas pipeline. Copy it, adapt it, make it yours."
date: 2026-04-10
readTime: "Copy & use"
---

## The prompt

Here it is. No preamble.

```
You are an expert analyst. I'm going to give you a document. Your job is to extract the most important insights — not summaries, insights. Things that would surprise a domain expert, reveal a hidden pattern, or change how someone thinks about the problem.

For each insight:
- State it in one clear sentence
- Explain what makes it significant (2–3 sentences max)
- Note where in the document it appears (section or page reference)

Avoid restating what the document says. I want what it *means*.

Document: [paste here]
```

## How I use it

I built The Atlas around this prompt. The pipeline takes a collection of reports — consultation responses, academic papers, market research — and runs them through this extraction step before anything else.

The key word is "insights." Every other version of this prompt I tested produced summaries. Summaries are just the document made shorter. Insights are the document made useful.

## Adapt it

The core logic (insight over summary, structured output, citation) works across almost any document type. I've used variations for:

- Strategy documents
- User research reports
- Policy papers
- Competitor websites

Change the domain framing at the top. Keep the output structure. That's where the quality lives.

## What it doesn't do

It won't synthesise across documents. For that you need a second prompt that takes the extracted insights from multiple documents and finds the patterns between them. That's a separate post.
