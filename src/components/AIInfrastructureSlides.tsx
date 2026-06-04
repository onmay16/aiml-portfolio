import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { SLIDE_COUNT, SLIDE_FOOTER, slides, type SlideId } from '../data/aiInfrastructureSlides';

function SlideFooter({ number }: { number: number }) {
  return (
    <footer className="nns-footer">
      <span className="nns-footer-text">{SLIDE_FOOTER}</span>
      <span className="nns-footer-page">{number}</span>
    </footer>
  );
}

function ContentSlide({
  number,
  title,
  subtitle,
  children,
}: {
  number: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="nns-slide nns-slide-content">
      <div className="nns-slide-inner">
        <header className="nns-content-header">
          <h2 className="nns-content-title">{title}</h2>
          {subtitle && <p className="nns-slide-subtitle">{subtitle}</p>}
          <hr className="nns-divider" />
        </header>
        <div className="nns-slide-body">{children}</div>
        <SlideFooter number={number} />
      </div>
    </div>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="nns-callout">
      <div className="nns-callout-accent" aria-hidden="true" />
      <div className="nns-callout-body">
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

const RESOURCE_CATEGORIES = [
  {
    icon: '▦',
    title: 'Data',
    includes: 'Training corpora, code, licensed datasets, human feedback',
    why: 'Determines what the model can learn and how broadly it can generalize.',
    color: '#25B7D3',
  },
  {
    icon: '◈',
    title: 'Compute',
    includes: 'GPUs/TPUs, high-speed networking, servers, storage',
    why: 'Enables massive parallel training across billions of parameters and trillions of tokens.',
    color: '#1B78C2',
  },
  {
    icon: '⚡',
    title: 'Energy',
    includes: 'Electricity, cooling, data center power usage',
    why: 'Large training runs and model serving can require significant operating resources.',
    color: '#F59E3D',
  },
  {
    icon: '◷',
    title: 'Time & Labor',
    includes: 'Researchers, engineers, annotators, safety teams',
    why: 'Human expertise is needed for architecture, data quality, training stability, and evaluation.',
    color: '#7C3AED',
  },
];

const PIPELINE_STEPS = [
  { n: '1', title: 'Data Collection', text: 'Collect text, code, licensed data, or domain datasets.' },
  { n: '2', title: 'Cleaning & Filtering', text: 'Remove duplicates, unsafe content, and low-quality data.' },
  { n: '3', title: 'Tokenization', text: 'Convert text into tokens the model can process mathematically.' },
  { n: '4', title: 'Pretraining', text: 'Learn general language patterns by predicting tokens at scale.' },
  { n: '5', title: 'Fine-tuning', text: 'Improve task performance, instruction-following, and alignment.' },
  { n: '6', title: 'Evaluation', text: 'Test accuracy, bias, safety, reliability, and benchmark results.' },
  { n: '7', title: 'Deployment', text: 'Serve the model through apps, APIs, monitoring, and inference systems.' },
];

const MODEL_EXAMPLES = [
  {
    model: 'GPT-4',
    org: 'OpenAI',
    info: 'Technical report describes large-scale pretraining and post-training alignment, but detailed training data, compute, and cost are not fully disclosed.',
  },
  {
    model: 'LLaMA 3.1 405B',
    org: 'Meta',
    info: 'Meta’s model card reports cumulative LLaMA 3.1 training used 39.3M H100-80GB GPU hours; 405B accounts for 30.84M GPU hours.',
  },
  {
    model: 'Gemini',
    org: 'Google DeepMind',
    info: 'Frontier-scale proprietary model; exact training cost is not fully public. Google’s AI systems rely on large-scale accelerator and data center infrastructure.',
  },
  {
    model: 'Claude',
    org: 'Anthropic',
    info: 'Frontier-scale proprietary model; exact training cost is not fully public. Development includes compute, data, safety testing, and deployment systems.',
  },
];

const COST_FACTORS = [
  { label: 'Specialized Hardware', pct: 92, text: 'Thousands of high-end GPUs/TPUs, servers, storage, and fast interconnects.' },
  { label: 'Energy & Cooling', pct: 78, text: 'Electricity and cooling are needed during long training runs and ongoing serving.' },
  { label: 'Data Pipeline', pct: 70, text: 'Collection, filtering, deduplication, licensing, and human feedback add cost.' },
  { label: 'Engineering Labor', pct: 65, text: 'Researchers and engineers handle model architecture, training stability, safety, and evaluation.' },
  { label: 'Deployment & Inference', pct: 58, text: 'After training, every user request still requires compute, monitoring, and optimization.' },
];

const TAKEAWAYS = [
  {
    n: '1',
    title: 'LLMs are infrastructure-heavy',
    text: 'Performance depends on pipelines, hardware, energy, and skilled teams, not just algorithms.',
  },
  {
    n: '2',
    title: 'Costs are layered',
    text: 'Data, compute, energy, time, safety testing, and deployment all contribute to total cost.',
  },
  {
    n: '3',
    title: 'Transparency varies',
    text: 'Open models often disclose more training information; proprietary models usually disclose less.',
  },
];

const REFERENCES = [
  'Indiana Wesleyan University. (2026). Assignment 3.4 Portfolio: AI Infrastructure [Course assignment instructions].',
  'Achiam, J., et al. (2023). GPT-4 Technical Report. OpenAI / arXiv.',
  'Meta Llama. (2024). Llama 3.1 Model Card. GitHub / Meta.',
  'Meta AI. (2024). Introducing Llama 3.1: Our most capable models to date.',
  'Epoch AI. (2024). How much does it cost to train frontier AI models?',
  'Epoch AI. (2026). Trends in Artificial Intelligence.',
];

function PipelineSlide() {
  return (
    <div className="ais-pipeline-layout">
      <div className="ais-pipeline-steps">
        {PIPELINE_STEPS.map((step) => (
          <article key={step.n} className="ais-pipeline-step">
            <span className="nns-step-num">{step.n}</span>
            <strong>{step.title}</strong>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
      <Callout title="Key idea">
        Training is a pipeline, not a single step. Infrastructure decisions affect model quality, speed,
        safety, and total cost.
      </Callout>
    </div>
  );
}

function ResourcesSlide() {
  return (
    <div className="nns-slide-stack ais-resources-slide">
      <div className="nns-card-grid nns-card-grid--2 ais-resource-grid">
        {RESOURCE_CATEGORIES.map((cat) => (
          <article key={cat.title} className="nns-info-card ais-resource-card">
            <span className="ais-resource-icon" style={{ color: cat.color }} aria-hidden="true">
              {cat.icon}
            </span>
            <h3>{cat.title}</h3>
            <p>
              <strong>Includes:</strong> {cat.includes}
            </p>
            <p>
              <strong>Why it matters:</strong> {cat.why}
            </p>
          </article>
        ))}
      </div>
      <p className="nns-summary-close">
        Training cost is not only the cost of hardware; it is the combined cost of data, compute, energy,
        time, and specialized expertise.
      </p>
    </div>
  );
}

function ModelsSlide() {
  return (
    <div className="ais-models-layout">
      <div className="ais-model-grid" role="table" aria-label="Real-world model infrastructure disclosures">
        <div className="ais-model-grid-head" role="row">
          <span role="columnheader">Model</span>
          <span role="columnheader">Organization</span>
          <span role="columnheader">Publicly available infrastructure / cost information</span>
        </div>
        {MODEL_EXAMPLES.map((row) => (
          <div key={row.model} className="ais-model-grid-row" role="row">
            <span className="ais-model-name" role="cell">
              {row.model}
            </span>
            <span className="ais-model-org" role="cell">
              {row.org}
            </span>
            <span className="ais-model-info" role="cell">
              {row.info}
            </span>
          </div>
        ))}
      </div>
      <p className="ais-models-note">
        Design note: When exact costs are undisclosed, the artifact labels them as “not fully public”
        instead of treating estimates as facts.
      </p>
    </div>
  );
}

function CostsSlide() {
  return (
    <div className="nns-slide-stack ais-costs-layout">
      <div className="ais-cost-bars" aria-label="Conceptual relative cost pressure by category">
        <span className="ais-cost-label">Relative cost pressure (conceptual)</span>
        {COST_FACTORS.map((item) => (
          <div key={item.label} className="ais-cost-row">
            <span className="ais-cost-name">{item.label}</span>
            <div className="ais-cost-track" aria-hidden="true">
              <div className="ais-cost-fill" style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <ul className="ais-cost-details">
        {COST_FACTORS.map((item) => (
          <li key={item.label}>
            <strong>{item.label}</strong>: {item.text}
          </li>
        ))}
      </ul>
      <Callout title="Training vs. inference">
        Training builds the model; inference serves it repeatedly to users. Both require infrastructure,
        but inference scales with every user request.
      </Callout>
    </div>
  );
}

function TakeawaysSlide() {
  return (
    <div className="ais-takeaways-layout">
      <div className="ais-takeaways">
        {TAKEAWAYS.map((item) => (
          <article key={item.n} className="ais-takeaway">
            <span className="nns-step-num">{item.n}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="ais-closing-insight">
        <strong>Closing insight</strong>
        <p>
          Generative AI development is shaped by infrastructure limits: the availability of high-quality
          data, specialized accelerators, energy-efficient data centers, and teams capable of training and
          evaluating models responsibly.
        </p>
      </div>
    </div>
  );
}

function ReferencesSlide() {
  return (
    <div className="ais-refs-layout">
      <ul className="ais-ref-list">
        {REFERENCES.map((ref) => (
          <li key={ref}>{ref}</li>
        ))}
      </ul>
      <p className="nns-playground-note">
        Note: For proprietary models such as GPT-4, Gemini, and Claude, exact training costs are not fully
        public, so the deck avoids presenting estimates as confirmed facts.
      </p>
    </div>
  );
}

function TitleSlide({ author }: { author: string }) {
  const pills = RESOURCE_CATEGORIES.map((c) => ({ icon: c.icon, label: c.title, color: c.color }));

  return (
    <div className="nns-slide nns-slide-hero ais-slide-hero">
      <div className="nns-title-overlay ais-hero-gradient" />
      <div className="nns-title-content">
        <h2 className="nns-title-heading">AI Infrastructure</h2>
        <p className="nns-title-tagline">Training Costs Behind Large Language Models</p>
        <p className="ais-title-desc">
          A visual portfolio artifact explaining how generative AI models are trained and why data,
          compute, energy, time, and human expertise drive model cost.
        </p>
        <div className="ais-title-pills" aria-hidden="true">
          {pills.map((pill) => (
            <span key={pill.label} className="ais-title-pill" style={{ borderColor: pill.color }}>
              <span style={{ color: pill.color }}>{pill.icon}</span> {pill.label}
            </span>
          ))}
        </div>
        <div className="nns-title-accent" aria-hidden="true" />
        <p className="nns-title-meta">
          AIML501 | Assignment 3.4 Portfolio: AI Infrastructure
          <br />
          {author}
        </p>
      </div>
    </div>
  );
}

function SlideContent({ id, author }: { id: SlideId; author: string }) {
  switch (id) {
    case 'title':
      return <TitleSlide author={author} />;
    case 'pipeline':
      return (
        <ContentSlide
          number={2}
          title="LLM Training Pipeline"
          subtitle="From raw data to a deployed generative AI system"
        >
          <PipelineSlide />
        </ContentSlide>
      );
    case 'resources':
      return (
        <ContentSlide
          number={3}
          title="Primary Resource Categories"
          subtitle="The main cost drivers behind large-scale generative AI training"
        >
          <ResourcesSlide />
        </ContentSlide>
      );
    case 'models':
      return (
        <ContentSlide
          number={4}
          title="Real-World Model Examples"
          subtitle="Public information varies: open models usually disclose more than proprietary frontier systems"
        >
          <ModelsSlide />
        </ContentSlide>
      );
    case 'costs':
      return (
        <ContentSlide number={5} title="Why Training LLMs Is Expensive">
          <CostsSlide />
        </ContentSlide>
      );
    case 'takeaways':
      return (
        <ContentSlide number={6} title="Key Takeaways" subtitle="What this artifact communicates about AI infrastructure">
          <TakeawaysSlide />
        </ContentSlide>
      );
    case 'references':
      return (
        <ContentSlide
          number={7}
          title="References"
          subtitle="Sources used to keep the presentation accurate and transparent"
        >
          <ReferencesSlide />
        </ContentSlide>
      );
    default:
      return null;
  }
}

interface Props {
  author?: string;
}

export default function AIInfrastructureSlides({ author = 'May Hong' }: Props) {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const goTo = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(SLIDE_COUNT - 1, next)));
  }, []);

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  return (
    <div className="neural-network-slides ai-infrastructure-slides" role="region" aria-label="AI infrastructure presentation">
      <div className="nns-toolbar">
        <span className="nns-counter">
          Slide {current.number} of {SLIDE_COUNT}
        </span>
        <span className="nns-hint">Use arrow keys or buttons to navigate</span>
      </div>

      <div className="nns-viewport">
        <button
          type="button"
          className="nns-nav nns-nav-prev"
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div className="nns-stage" aria-live="polite" aria-atomic="true">
          <SlideContent id={current.id} author={author} />
        </div>

        <button
          type="button"
          className="nns-nav nns-nav-next"
          onClick={next}
          disabled={index === SLIDE_COUNT - 1}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className="nns-dots" role="tablist" aria-label="Slide navigation">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            className={`nns-dot${i === index ? ' nns-dot-active' : ''}`}
            aria-selected={i === index}
            aria-label={`Go to slide ${slide.number}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
