export type XaiIconName =
  | 'user'
  | 'scale'
  | 'landmark'
  | 'box'
  | 'network'
  | 'file-x'
  | 'alert-triangle'
  | 'clipboard-list'
  | 'brain'
  | 'shield-check'
  | 'book-open'
  | 'clipboard-check'
  | 'target'
  | 'layout-grid'
  | 'users'
  | 'shield-alert'
  | 'shield'
  | 'trophy';

export interface XaiBenefit {
  id: string;
  icon: XaiIconName;
  label: string;
}

export interface XaiChallenge {
  id: string;
  icon: XaiIconName;
  title: string;
  summary: string;
  detail: string;
}

export interface IndustryApproach {
  id: string;
  org: string;
  icon: XaiIconName;
  summary: string;
  detail: string;
}

export interface ValidationMetric {
  id: string;
  icon: XaiIconName;
  title: string;
  summary: string;
  detail: string;
}

export const INFOGRAPHIC_TITLE = 'Explainable AI: Building Trust in Large Language Models';

export const INFOGRAPHIC_SUBTITLE =
  'How transparency, validation, and metrics improve reliability in GPT, Claude, Gemini, and LLaMA.';

export const XAI_DEFINITION =
  'Explainable AI refers to methods that make AI model decisions more transparent, understandable, and accountable to humans.';

export const xaiBenefits: XaiBenefit[] = [
  { id: 'trust', icon: 'user', label: 'Builds user trust' },
  { id: 'accountability', icon: 'scale', label: 'Supports accountability' },
  { id: 'high-stakes', icon: 'landmark', label: 'Critical in healthcare, finance, and law' },
];

export const llmChallenges: XaiChallenge[] = [
  {
    id: 'black-box',
    icon: 'box',
    title: 'Black-box complexity',
    summary: 'Outputs emerge from billions of parameters and complex interactions.',
    detail:
      'Large language models distribute reasoning across millions or billions of weights. No single rule or pathway fully explains a response, which makes internal decision-making difficult to inspect directly.',
  },
  {
    id: 'distributed-reasoning',
    icon: 'network',
    title: 'Distributed reasoning',
    summary: 'No single rule or component fully explains a response.',
    detail:
      'A model may produce a correct answer through overlapping representations rather than one interpretable chain of logic. That distributed structure limits how much any one visualization can reveal.',
  },
  {
    id: 'post-hoc',
    icon: 'file-x',
    title: 'Post-hoc explanation limits',
    summary: "A model's explanation may not reflect its true internal process.",
    detail:
      'When models generate explanations after the fact, those narratives can be plausible without being faithful to the computation that actually produced the output, which can undermine trust.',
  },
  {
    id: 'bias',
    icon: 'alert-triangle',
    title: 'Bias and data quality',
    summary: 'Training data can introduce bias, noise, or unfair patterns.',
    detail:
      'Models learn from large web-scale corpora that may under-represent some groups or over-represent harmful stereotypes. Explainability must therefore include scrutiny of data provenance and output fairness.',
  },
  {
    id: 'regulatory',
    icon: 'landmark',
    title: 'Regulatory concerns',
    summary: 'High-stakes uses require transparency and accountability.',
    detail:
      'Healthcare, finance, and legal applications often face strict audit and compliance requirements. Opaque models create risk when stakeholders cannot justify or challenge automated decisions.',
  },
];

export const industryApproaches: IndustryApproach[] = [
  {
    id: 'openai',
    org: 'OpenAI',
    icon: 'clipboard-list',
    summary: 'System cards, safety evaluations, and evals document model behavior and risks.',
    detail:
      'OpenAI publishes system cards and evaluation results for frontier models, describing capabilities, limitations, and known failure modes so users can understand what a model is designed to do—and where it may fail.',
  },
  {
    id: 'anthropic',
    org: 'Anthropic',
    icon: 'brain',
    summary:
      'Interpretability research and Constitutional AI aim to make model behavior easier to understand.',
    detail:
      'Anthropic invests in mechanistic interpretability and Constitutional AI, combining research into internal model behavior with training approaches that encode explicit principles for safer, more predictable outputs.',
  },
  {
    id: 'google',
    org: 'Google DeepMind',
    icon: 'shield-check',
    summary: 'Model cards describe capabilities, limitations, and safety considerations.',
    detail:
      'Google DeepMind and Google AI publish model cards for systems such as Gemini that summarize intended use, evaluation results, ethical considerations, and known limitations for developers and policymakers.',
  },
  {
    id: 'meta',
    org: 'Meta',
    icon: 'book-open',
    summary: 'LLaMA documentation and model cards promote transparency for open models.',
    detail:
      'Meta releases detailed LLaMA model cards and documentation with open weights, enabling researchers and practitioners to inspect architecture, training context, and responsible-use guidance directly.',
  },
];

export const validationMetrics: ValidationMetric[] = [
  {
    id: 'validation',
    icon: 'clipboard-check',
    title: 'Validation',
    summary: 'Checks whether performance holds on new data.',
    detail:
      'Hold-out, cross-validation, and benchmark suites test whether a model generalizes beyond the data it was trained on, reducing the risk of overfitting and hidden failure modes.',
  },
  {
    id: 'accuracy',
    icon: 'target',
    title: 'Accuracy',
    summary: 'Measures how often predictions are correct.',
    detail:
      'Accuracy provides a baseline signal for classification and structured tasks, though it must be interpreted alongside class balance and task-specific error costs.',
  },
  {
    id: 'f1',
    icon: 'scale',
    title: 'F1 Score',
    summary: 'Balances precision and recall.',
    detail:
      'The F1 score is especially useful when false positives and false negatives carry different consequences, such as in medical screening or fraud detection.',
  },
  {
    id: 'confusion-matrix',
    icon: 'layout-grid',
    title: 'Confusion Matrix',
    summary: 'Reveals where errors occur.',
    detail:
      'Confusion matrices show which classes or outcomes are confused with one another, helping teams diagnose systematic mistakes instead of relying on a single aggregate score.',
  },
  {
    id: 'bias-testing',
    icon: 'users',
    title: 'Bias Testing',
    summary: 'Examines fairness across groups and scenarios.',
    detail:
      'Bias testing evaluates whether model outputs differ unfairly across demographic groups, languages, or edge cases, supporting accountability in high-stakes deployments.',
  },
  {
    id: 'robustness',
    icon: 'shield-alert',
    title: 'Robustness Testing',
    summary: 'Tests reliability on noisy, adversarial, or edge-case inputs.',
    detail:
      'Robustness checks expose fragility to typos, prompt injection, distribution shift, and adversarial inputs—conditions that explainability alone cannot fully address.',
  },
];

export const hubIcon: XaiIconName = 'shield';

export const humanEvaluationIcon: XaiIconName = 'users';

export const footerIcon: XaiIconName = 'trophy';

export const hubMessage = 'Trust should be measured, not assumed.';

export const humanEvaluationNote =
  'Human evaluation is also important for helpfulness, harmlessness, and factuality.';

export const footerFormula =
  'Transparent explanations + rigorous validation + measurable metrics = more trustworthy AI systems';

export type SelectableItem =
  | { kind: 'challenge'; item: XaiChallenge }
  | { kind: 'industry'; item: IndustryApproach }
  | { kind: 'metric'; item: ValidationMetric };

export const defaultSelection: SelectableItem = {
  kind: 'challenge',
  item: llmChallenges[0],
};
