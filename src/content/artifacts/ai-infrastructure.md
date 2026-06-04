---
title: "AI Infrastructure: Training Costs Behind Large Language Models"
introduction: >-
  An interactive slide presentation that explains how generative AI models are trained, which
  infrastructure resources drive cost, and how public disclosures differ across frontier and open models.
description: >-
  This artifact translates AI infrastructure concepts into a professional visual presentation embedded
  in the portfolio. It covers the LLM training pipeline from data collection through deployment, four primary
  resource categories (data, compute, energy, time and labor), real-world examples from GPT-4, LLaMA,
  Gemini, and Claude, and a conceptual breakdown of why training and inference are expensive.
objective: >-
  To explain the infrastructure behind generative AI model training, identify the primary resource
  categories that drive cost, and communicate these concepts clearly for both technical and
  non-technical audiences using accurate, transparent sourcing.
process: >-
  I mapped the assignment requirements to a seven-slide PowerPoint deck covering the training pipeline,
  resource categories, model examples, cost drivers, and key takeaways, with citations from course
  instructions, OpenAI, Meta, and Epoch AI. I then recreated the deck as an interactive React slide
  presentation in this Astro portfolio so viewers can navigate slides with arrows, keyboard controls, and
  dot indicators without downloading a separate file.
tools: []
valueProposition:
  uniqueValue: >-
    Combines a polished visual presentation with an in-portfolio interactive viewer, and clearly labels
    undisclosed proprietary training costs instead of presenting estimates as confirmed facts.
  relevance: >-
    Understanding AI infrastructure and training economics is essential for responsible AIML practice
    and for communicating with stakeholders about what frontier models actually require.
references:
  - 'Achiam, J., et al. (2023). GPT-4 Technical Report: https://arxiv.org/abs/2303.08774'
  - 'Meta Llama (2024). Llama 3.1 Model Card: https://github.com/meta-llama/llama-models'
  - 'Epoch AI (2024). How much does it cost to train frontier AI models? https://epoch.ai'
featured: true
interactive: ai-infrastructure-slides
---

## Reflection

Building this artifact helped me see generative AI as an infrastructure problem, not only an algorithmic one. The presentation walks through the full training pipeline, from collecting and cleaning data, through pretraining and fine-tuning, to evaluation and deployment, and shows how each stage depends on specialized hardware, energy, and skilled teams.

The resource-category slide made the cost structure concrete: data determines what a model can learn, compute enables scale, energy powers long runs and serving, and human labor drives architecture choices, data quality, and safety evaluation. Comparing GPT-4, LLaMA 3.1 405B, Gemini, and Claude also showed how transparency differs. Meta’s open model card reports specific GPU-hour figures, while proprietary frontier systems often disclose less about training data, compute, and total cost.

The cost-breakdown slide reinforced that training and inference are separate expenses. Training builds the model once at massive scale; inference repeats compute for every user request. Overall, this artifact strengthened my ability to explain why large language models are expensive, what infrastructure they require, and how to discuss public information responsibly when exact figures are not available.
