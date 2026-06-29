export type Domain = 'nlp' | 'vision' | 'tabular';
export type RatingLevel = 'high' | 'medium' | 'low';

export interface ModelRating {
  label: string;
  level: RatingLevel;
}

export interface ModelEntry {
  id: string;
  name: string;
  domain: Domain;
  domainLabel: string;
  size: string;
  accuracy: string;
  speed: ModelRating;
  explainability: ModelRating;
  bestUseCase: string;
  summary: string;
  detail: string;
  strengths: string[];
  weaknesses: string[];
}

export interface TradeOffInsight {
  id: string;
  title: string;
  summary: string;
  detail: string;
}

export interface Recommendation {
  id: string;
  label: string;
  models: string;
  detail: string;
}

export const MATRIX_TITLE =
  'Model Selection Decision Matrix: Balancing Size, Accuracy, Speed, and Explainability Across AI Domains';

export const MATRIX_SUBTITLE =
  'Compare five pre-trained models across NLP, computer vision, and tabular data to find the best fit for your deployment constraints.';

export const MATRIX_INTRO =
  'The best model depends on your application domain and deployment constraints. Select a model row or insight card below to explore trade-offs in detail.';

export const models: ModelEntry[] = [
  {
    id: 'bert-base',
    name: 'BERT-base',
    domain: 'nlp',
    domainLabel: 'NLP',
    size: '110M params',
    accuracy: 'Strong language understanding',
    speed: { label: 'Medium–Slow', level: 'medium' },
    explainability: { label: 'Low–Medium', level: 'medium' },
    bestUseCase: 'Text classification, QA',
    summary: 'A strong but larger NLP baseline with high accuracy at the cost of speed.',
    detail:
      'BERT-base established the transformer encoder paradigm for NLP. It delivers strong language understanding on classification and question-answering tasks, but its 110M parameters and bidirectional attention make inference slower than compressed variants. Explainability is limited because decisions emerge from deep attention layers rather than simple rules.',
    strengths: [
      'Strong benchmark performance on NLP understanding tasks',
      'Well-supported in Hugging Face and PyTorch ecosystems',
      'Reliable baseline for fine-tuning on domain-specific text',
    ],
    weaknesses: [
      'Larger memory footprint than distilled alternatives',
      'Slower inference than DistilBERT and other compressed models',
      'Limited inherent interpretability for individual predictions',
    ],
  },
  {
    id: 'distilbert',
    name: 'DistilBERT',
    domain: 'nlp',
    domainLabel: 'NLP',
    size: '~40% smaller than BERT',
    accuracy: '~97% of BERT performance',
    speed: { label: '~60% faster', level: 'high' },
    explainability: { label: 'Medium', level: 'medium' },
    bestUseCase: 'Low-latency NLP',
    summary: 'A compressed BERT variant that keeps most accuracy while improving deployment efficiency.',
    detail:
      'DistilBERT uses knowledge distillation to retain roughly 97% of BERT-base performance while cutting model size by about 40% and improving inference speed by roughly 60%. It is a practical choice when latency, memory, or serving cost matter but you still need strong NLP performance.',
    strengths: [
      'Significantly faster inference than BERT-base',
      'Smaller footprint for edge and high-throughput serving',
      'Retains most of the original model’s accuracy',
    ],
    weaknesses: [
      'Slightly lower accuracy ceiling than full BERT on some tasks',
      'Still a deep transformer with limited per-prediction explainability',
      'May underperform on highly specialized or low-resource domains',
    ],
  },
  {
    id: 'mobilenetv3',
    name: 'MobileNetV3-Large',
    domain: 'vision',
    domainLabel: 'Vision',
    size: '5.5M params',
    accuracy: 'ImageNet Top-1: 75.274',
    speed: { label: 'Very fast (0.22 GFLOPS)', level: 'high' },
    explainability: { label: 'Medium', level: 'medium' },
    bestUseCase: 'Mobile image classification',
    summary: 'An ultra-lightweight vision model optimized for speed on mobile and edge devices.',
    detail:
      'MobileNetV3-Large is designed for resource-constrained environments. With only 5.5M parameters and very low compute cost (0.22 GFLOPS), it prioritizes inference speed over peak accuracy. It is ideal when deployment targets phones, embedded devices, or real-time pipelines where latency is critical.',
    strengths: [
      'Extremely fast inference with minimal compute requirements',
      'Small enough for mobile and edge deployment',
      'Well-suited for real-time image classification',
    ],
    weaknesses: [
      'Lower ImageNet accuracy than EfficientNet-B0',
      'May struggle on fine-grained or highly complex visual tasks',
      'Deep learning interpretability remains moderate',
    ],
  },
  {
    id: 'efficientnet-b0',
    name: 'EfficientNet-B0',
    domain: 'vision',
    domainLabel: 'Vision',
    size: '5.3M params',
    accuracy: 'ImageNet Top-1: 77.692',
    speed: { label: 'Fast (0.39 GFLOPS)', level: 'high' },
    explainability: { label: 'Medium', level: 'medium' },
    bestUseCase: 'Balanced image classification',
    summary: 'A balanced vision model that trades a small speed cost for higher accuracy.',
    detail:
      'EfficientNet-B0 uses compound scaling to achieve strong accuracy per parameter. At 5.3M parameters it slightly outperforms MobileNetV3-Large on ImageNet while remaining fast enough for many production workloads. It is the recommended choice when you need a balanced trade-off between speed and classification quality.',
    strengths: [
      'Higher accuracy than MobileNetV3-Large at similar parameter count',
      'Efficient scaling architecture for production vision tasks',
      'Good default for general-purpose image classification',
    ],
    weaknesses: [
      'Slightly higher compute cost than MobileNetV3-Large',
      'Still limited explainability compared to tree-based models',
      'May require more tuning for domain-specific datasets',
    ],
  },
  {
    id: 'lightgbm',
    name: 'LightGBM',
    domain: 'tabular',
    domainLabel: 'Tabular',
    size: 'Depends on trees/features',
    accuracy: 'Strong structured-data performance',
    speed: { label: 'Very fast, memory-efficient', level: 'high' },
    explainability: { label: 'Medium–High', level: 'high' },
    bestUseCase: 'Risk scoring, healthcare/business tables',
    summary: 'A gradient boosting model for tabular data with strong speed and interpretability.',
    detail:
      'LightGBM excels on structured tabular data where features are already defined in columns. It trains and serves quickly, handles large datasets efficiently, and supports feature importance and SHAP-style explanations. It is the recommended choice when stakeholders need to understand why a prediction was made.',
    strengths: [
      'Strong performance on structured tabular datasets',
      'Fast training and inference with low memory use',
      'Better interpretability via feature importance and tree paths',
    ],
    weaknesses: [
      'Not suitable for raw text, images, or unstructured inputs',
      'Performance depends heavily on feature engineering quality',
      'Can overfit on small or noisy tabular datasets',
    ],
  },
];

export const tradeOffInsights: TradeOffInsight[] = [
  {
    id: 'performance-cost',
    title: 'Performance vs. Cost',
    summary: 'Larger models often improve performance but increase compute cost and latency.',
    detail:
      'BERT-base illustrates this trade-off clearly: it delivers strong NLP accuracy but requires more memory and slower inference than DistilBERT. In production, the marginal accuracy gain must justify the added infrastructure and serving expense.',
  },
  {
    id: 'efficiency',
    title: 'Efficiency',
    summary: 'Compressed models like DistilBERT can preserve most accuracy while improving deployment efficiency.',
    detail:
      'Model compression through distillation, pruning, or quantization lets teams deploy AI where full-scale models would be too slow or expensive. DistilBERT shows that a ~40% size reduction can come with only a small accuracy drop.',
  },
  {
    id: 'vision-balance',
    title: 'Vision Balance',
    summary: 'Vision models differ mainly in the balance between speed and accuracy.',
    detail:
      'MobileNetV3-Large prioritizes speed for mobile and edge use, while EfficientNet-B0 offers higher ImageNet accuracy at a modest compute increase. The right choice depends on whether latency or classification quality is the primary constraint.',
  },
  {
    id: 'interpretability',
    title: 'Interpretability',
    summary: 'Tree-based tabular models like LightGBM often offer stronger interpretability than deep learning.',
    detail:
      'In regulated or high-stakes domains—healthcare risk scoring, credit decisions, fraud detection—stakeholders often need to explain individual predictions. LightGBM’s tree structure and feature importance make it easier to audit than neural network black boxes.',
  },
];

export const recommendations: Recommendation[] = [
  {
    id: 'speed',
    label: 'Best for speed',
    models: 'MobileNetV3-Large or DistilBERT',
    detail:
      'Choose MobileNetV3-Large for mobile vision pipelines and DistilBERT for low-latency NLP serving. Both prioritize inference efficiency while retaining practical accuracy.',
  },
  {
    id: 'explainability',
    label: 'Best for explainability',
    models: 'LightGBM',
    detail:
      'When stakeholders need to understand why a model made a prediction, LightGBM’s tree-based structure and feature importance scores provide clearer accountability than deep learning alternatives.',
  },
  {
    id: 'nlp-balance',
    label: 'Best balanced NLP choice',
    models: 'DistilBERT',
    detail:
      'DistilBERT offers the best practical balance for NLP workloads that need strong performance without the full cost of BERT-base.',
  },
  {
    id: 'vision-balance',
    label: 'Best balanced vision choice',
    models: 'EfficientNet-B0',
    detail:
      'EfficientNet-B0 delivers higher accuracy than MobileNetV3-Large while remaining fast enough for most production image classification scenarios.',
  },
];

export const domainFilters: { id: Domain | 'all'; label: string }[] = [
  { id: 'all', label: 'All domains' },
  { id: 'nlp', label: 'NLP' },
  { id: 'vision', label: 'Vision' },
  { id: 'tabular', label: 'Tabular' },
];

export const defaultModelId = 'distilbert';
