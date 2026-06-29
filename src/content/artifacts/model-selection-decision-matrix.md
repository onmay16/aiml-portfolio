---
title: Model Selection Decision Matrix
introduction: >-
  A decision matrix comparing five pre-trained models across NLP, computer vision, and tabular data
  domains, highlighting trade-offs between model size, accuracy, speed, and explainability.
description: >-
  This artifact analyzes BERT-base, DistilBERT, MobileNetV3-Large, EfficientNet-B0, and LightGBM to
  show how model selection depends on deployment constraints. An interactive decision matrix compares
  models with color-coded speed and explainability ratings, domain filters, trade-off insights, and
  scenario-based recommendations.
objective: >-
  To research and compare pre-trained models across NLP, computer vision, and tabular data domains;
  analyze trade-offs between model size, accuracy, speed, and explainability; and present findings in
  a clear decision matrix that supports informed model selection for real-world AI applications.
process: >-
  I selected five models spanning three domains: BERT-base and DistilBERT for NLP, MobileNetV3-Large
  and EfficientNet-B0 for computer vision, and LightGBM for tabular data. Using ChatGPT and published
  model documentation, I gathered data on parameter counts, benchmark accuracy, inference speed, and
  interpretability characteristics. I then built an interactive decision matrix in this portfolio so
  viewers can filter by domain, compare models side by side, and expand trade-off insights and
  recommendations on demand.
valueProposition:
  uniqueValue: >-
    Combines a cross-domain model comparison with an interactive explorer, so viewers can filter by
    domain and drill into strengths, weaknesses, and deployment recommendations on demand.
  relevance: >-
    Choosing the right pre-trained model is a core AIML skill; this artifact demonstrates the ability
    to evaluate models systematically and recommend practical options based on deployment constraints.
references:
  - 'Devlin, J., et al. (2019). BERT: Pre-training of Deep Bidirectional Transformers: https://arxiv.org/abs/1810.04805'
  - 'Sanh, V., et al. (2019). DistilBERT, a distilled version of BERT: https://arxiv.org/abs/1910.01108'
  - 'Howard, A., et al. (2019). Searching for MobileNetV3: https://arxiv.org/abs/1905.02244'
  - 'PyTorch (2026). EfficientNet-B0 Model Documentation: https://pytorch.org/vision/stable/models/efficientnet.html'
  - 'Ke, G., et al. (2017). LightGBM: A Highly Efficient Gradient Boosting Decision Tree: https://papers.nips.cc/paper/6907-lightgbm'
featured: true
interactive: model-selection-matrix
---

## Explanatory Document

This portfolio artifact compares five AI models across three domains: NLP, computer vision, and tabular data. The goal is to show how model selection depends on trade-offs between model size, accuracy, speed, and explainability.

The selected models are BERT-base, DistilBERT, MobileNetV3-Large, EfficientNet-B0, and LightGBM. BERT-base represents a strong but larger NLP model, while DistilBERT shows how a compressed model can improve speed while keeping most of the original model's performance. MobileNetV3-Large and EfficientNet-B0 were selected to compare lightweight computer vision models. LightGBM was included because it is commonly used for structured tabular data and offers stronger interpretability than many deep learning models.

The decision matrix highlights that there is no single best model for every situation. DistilBERT is a practical choice for low-latency NLP tasks, MobileNetV3-Large is useful for mobile image classification, EfficientNet-B0 provides a balanced vision option, and LightGBM is recommended when explainability is important for structured data.

Overall, this artifact demonstrates that effective AI model selection requires balancing technical performance with real-world deployment needs, including speed, computing resources, and the ability to explain model decisions.
