export type LearningStyle = 'supervised' | 'unsupervised';

export type Domain =
  | 'tabular'
  | 'vision'
  | 'nlp-genai'
  | 'clustering'
  | 'dimensionality-reduction';

export interface AlgorithmNode {
  id: string;
  label: string;
  learningStyle: LearningStyle;
  domain: Domain;
  domains: string[];
  useCases: string[];
  explanation: string;
}

export const algorithms: AlgorithmNode[] = [
  {
    id: 'linear-regression',
    label: 'Linear Regression',
    learningStyle: 'supervised',
    domain: 'tabular',
    domains: ['Tabular Data'],
    useCases: [
      'Forecasting sales or demand from historical records',
      'Estimating housing prices from features like size and location',
      'Predicting patient length-of-stay from structured clinical variables',
    ],
    explanation:
      'Linear regression fits a straight-line (or hyperplane) relationship between input features and a continuous target. It minimizes squared error between predicted and actual values, making it fast, interpretable, and a strong baseline for many tabular prediction tasks.',
  },
  {
    id: 'decision-tree',
    label: 'Decision Tree',
    learningStyle: 'supervised',
    domain: 'tabular',
    domains: ['Tabular Data'],
    useCases: [
      'Classifying loan default risk with explainable branch rules',
      'Triaging support tickets by priority from categorical features',
      'Identifying which product attributes drive purchase decisions',
    ],
    explanation:
      'A decision tree recursively splits data on feature thresholds that best separate classes or reduce variance. Each path from root to leaf forms an interpretable rule set, which helps stakeholders understand why a prediction was made.',
  },
  {
    id: 'random-forest',
    label: 'Random Forest',
    learningStyle: 'supervised',
    domain: 'tabular',
    domains: ['Tabular Data'],
    useCases: [
      'Predicting hospital readmission from EHR tabular features',
      'Scoring customer churn with mixed numeric and categorical inputs',
      'Ranking feature importance for fraud detection models',
    ],
    explanation:
      'Random Forest builds many decision trees on bootstrapped samples and random feature subsets, then aggregates their votes or averages. This ensemble approach reduces overfitting and often delivers strong accuracy on structured data without heavy tuning.',
  },
  {
    id: 'svm',
    label: 'Support Vector Machine (SVM)',
    learningStyle: 'supervised',
    domain: 'tabular',
    domains: ['Tabular Data', 'Computer Vision'],
    useCases: [
      'Text classification with high-dimensional sparse features',
      'Handwritten digit recognition (classic MNIST benchmark)',
      'Binary classification when the decision boundary is complex but data is limited',
    ],
    explanation:
      'SVM finds the optimal separating hyperplane (or kernel-transformed boundary) that maximizes margin between classes. Kernel tricks allow nonlinear boundaries, making SVMs effective for medium-sized datasets in tabular and some vision settings.',
  },
  {
    id: 'cnn',
    label: 'Convolutional Neural Network (CNN)',
    learningStyle: 'supervised',
    domain: 'vision',
    domains: ['Computer Vision'],
    useCases: [
      'Medical image screening (e.g., detecting lesions in X-rays)',
      'Object detection in autonomous systems and robotics',
      'Quality inspection on manufacturing lines using camera feeds',
    ],
    explanation:
      'CNNs apply learnable filters across local regions of an image to detect edges, textures, and higher-level patterns. Weight sharing and pooling make them efficient for spatial data, powering most modern image classification and detection pipelines.',
  },
  {
    id: 'transformer',
    label: 'Transformer',
    learningStyle: 'supervised',
    domain: 'nlp-genai',
    domains: ['Natural Language Processing', 'Generative AI'],
    useCases: [
      'Sentiment analysis and document classification (BERT-style models)',
      'Machine translation and summarization',
      'Text generation with large language models (GPT family)',
    ],
    explanation:
      'Transformers use self-attention to weigh relationships between all tokens in a sequence, capturing long-range context better than older RNN approaches. Pre-trained models fine-tuned on domain text underpin today\'s NLP and generative AI applications.',
  },
  {
    id: 'k-means',
    label: 'K-Means',
    learningStyle: 'unsupervised',
    domain: 'clustering',
    domains: ['Tabular Data', 'Clustering'],
    useCases: [
      'Customer segmentation for marketing campaigns',
      'Grouping similar patient profiles for care pathway analysis',
      'Organizing inventory or product catalogs by behavioral similarity',
    ],
    explanation:
      'K-Means partitions data into K clusters by iteratively assigning points to the nearest centroid and updating centroids to minimize within-cluster variance. It is simple and scalable for discovering natural groupings when labels are unavailable.',
  },
  {
    id: 'pca',
    label: 'Principal Component Analysis (PCA)',
    learningStyle: 'unsupervised',
    domain: 'dimensionality-reduction',
    domains: ['Tabular Data', 'Dimensionality Reduction'],
    useCases: [
      'Compressing high-dimensional features before visualization or modeling',
      'Noise reduction in genomics or sensor datasets',
      'Speeding up downstream algorithms by reducing feature count',
    ],
    explanation:
      'PCA projects data onto orthogonal directions (principal components) that capture the most variance. By keeping only the top components, you reduce dimensionality while preserving structure—useful for exploration, preprocessing, and efficiency.',
  },
];

export const algorithmsById = Object.fromEntries(
  algorithms.map((a) => [a.id, a]),
) as Record<string, AlgorithmNode>;

export const defaultAlgorithmId = 'linear-regression';
