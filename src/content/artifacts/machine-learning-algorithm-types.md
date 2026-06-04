---
title: Machine Learning Algorithm Types Framework
introduction: >-
  An interactive visual framework that maps eight core machine learning algorithms by learning
  style, application domain, and real-world use cases.
description: >-
  This artifact presents a hierarchical taxonomy of machine learning algorithms, from supervised
  tabular models through computer vision and NLP/GenAI, to unsupervised clustering and dimensionality
  reduction. Each algorithm node includes its learning type, application domains, example use cases,
  and a concise explanation of how it works. The interactive framework makes relationships between
  algorithms visually clear and supports quick comparison when selecting approaches for real problems.
objective: >-
  To clearly identify and categorize key machine learning algorithms, illustrate their primary
  application domains (tabular data, computer vision, NLP, and generative AI), and communicate
  algorithmic concepts through a professional-quality, visually compelling portfolio deliverable.
process: >-
  I started from the course taxonomy (supervised vs. unsupervised, then domain branches) and mapped
  eight algorithms to leaf nodes matching the assignment diagram. For each algorithm I documented
  learning type, domains, use cases, and a brief explanation aligned with the rubric. I then built
  an interactive React component within this Astro portfolio so viewers can explore the framework
  and drill into details on demand, rather than relying on a static image alone.
tools: []
valueProposition:
  uniqueValue: >-
    Combines a structured algorithm taxonomy with an interactive explorer, so technical and
    non-technical audiences can see how algorithms relate and access rubric-level detail on demand.
  relevance: >-
    Choosing the right algorithm for tabular, vision, NLP, or generative AI problems is a core AIML
    skill; this artifact demonstrates that I can organize and communicate that knowledge clearly.
references: []
deliverables: []
featured: true
interactive: algorithm-framework
---

## Reflection

Building this framework reinforced that algorithm choice starts with **learning style** (supervised vs. unsupervised) and **data modality** (tabular, images, text), not with model hype. Organizing eight algorithms into a single taxonomy helped me see where methods overlap. For example, SVMs span tabular and some vision tasks, while Transformers anchor both NLP and generative AI. Presenting this as an interactive portfolio artifact also pushed me to write for multiple audiences: concise labels in the tree, with deeper explanations available on click.
