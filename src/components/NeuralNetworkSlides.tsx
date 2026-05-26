import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { SLIDE_COUNT, SLIDE_FOOTER, slides, type SlideId } from '../data/neuralNetworkSlides';

const HERO_BG = '/media/neural-network-slides/hero-bg.png';

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

function NeuronDot({ color }: { color: string }) {
  return <span className="nns-neuron" style={{ background: color }} aria-hidden="true" />;
}

function layerYs(count: number, top: number, span: number): number[] {
  if (count === 1) return [top + span / 2];
  const step = span / (count - 1);
  return Array.from({ length: count }, (_, i) => top + i * step);
}

function connectLayer(
  from: number[],
  to: number[],
  x1: number,
  x2: number,
  stroke: string,
): ReactNode[] {
  return from.flatMap((y1, i1) =>
    to.map((y2, i2) => (
      <line
        key={`${x1}-${y1}-${x2}-${y2}-${i1}-${i2}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth="1.5"
        opacity="0.55"
      />
    )),
  );
}

function ArchitectureDiagram() {
  const xIn = 52;
  const xH1 = 228;
  const xH2 = 404;
  const xOut = 580;
  const r = 11;

  const inputY = layerYs(3, 48, 120);
  const h1Y = layerYs(5, 32, 152);
  const h2Y = layerYs(4, 44, 128);
  const outY = layerYs(2, 72, 72);

  const layers = [
    { label: 'Input Layer', color: '#25B7D3', xs: xIn, ys: inputY },
    { label: 'Hidden Layer 1', color: '#1B78C2', xs: xH1, ys: h1Y },
    { label: 'Hidden Layer 2', color: '#7C3AED', xs: xH2, ys: h2Y },
    { label: 'Output Layer', color: '#F59E3D', xs: xOut, ys: outY },
  ];

  return (
    <div className="nns-arch">
      <svg
        className="nns-arch-svg"
        viewBox="0 0 640 210"
        role="img"
        aria-label="Neural network diagram showing data flow from input layer through hidden layers to output layer"
      >
        <g className="nns-arch-wires">
          {connectLayer(inputY, h1Y, xIn + r, xH1 - r, '#9ECFE0')}
          {connectLayer(h1Y, h2Y, xH1 + r, xH2 - r, '#B9A7E8')}
          {connectLayer(h2Y, outY, xH2 + r, xOut - r, '#E5B16F')}
        </g>
        {layers.map((layer) => (
          <g key={layer.label}>
            <text
              x={layer.xs}
              y="18"
              textAnchor="middle"
              className="nns-arch-svg-label"
            >
              {layer.label}
            </text>
            {layer.ys.map((y, i) => (
              <circle
                key={i}
                cx={layer.xs}
                cy={y}
                r={r}
                fill={layer.color}
                fillOpacity="0.9"
                stroke="#fff"
                strokeWidth="2"
              />
            ))}
          </g>
        ))}
      </svg>
      <div className="nns-arch-captions">
        <span>
          Input features
          <br />
          (e.g., X₁, X₂)
        </span>
        <span>Hidden layers transform the inputs into increasingly useful patterns.</span>
        <span>
          Prediction
          <br />
          (class/probability)
        </span>
      </div>
      <Callout title="Main idea">
        A neural network is a connected system. Each layer receives information from the previous layer,
        transforms it, and passes it forward until the output layer produces a result.
      </Callout>
    </div>
  );
}

function LayerCards() {
  const items = [
    {
      title: 'Input layer',
      text: 'Receives the raw feature values. It does not learn patterns by itself; it simply introduces data into the network.',
      tag: 'Input',
      color: '#25B7D3',
    },
    {
      title: 'Hidden layers',
      text: 'Learn intermediate patterns by combining weighted inputs and activation functions. More layers can model more complex relationships.',
      tag: 'Hidden',
      color: '#1B78C2',
    },
    {
      title: 'Output layer',
      text: 'Converts the final hidden representation into the model’s prediction, such as a class label or probability.',
      tag: 'Output',
      color: '#F59E3D',
    },
  ];

  return (
    <div className="nns-layers nns-slide-stack">
      <div className="nns-card-grid nns-card-grid--3">
        {items.map((item) => (
          <article key={item.title} className="nns-info-card">
            <span className="nns-layer-pill" style={{ background: item.color }}>
              {item.tag}
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="nns-layer-flow" aria-hidden="true">
        <span className="nns-flow-pill" style={{ background: '#25B7D3' }}>
          Input
        </span>
        <span className="nns-flow-arrow">→</span>
        <span className="nns-flow-pill" style={{ background: '#1B78C2' }}>
          Hidden
        </span>
        <span className="nns-flow-arrow">→</span>
        <span className="nns-flow-pill" style={{ background: '#F59E3D' }}>
          Output
        </span>
      </div>
      <p className="nns-playground-note">
        In the Playground, adding layers helped with more complex patterns such as spirals, but extra depth
        was not automatically useful when the data was noisy.
      </p>
    </div>
  );
}

function NeuronDiagram() {
  const inputY = [24, 60, 96];

  return (
    <div className="nns-neuron-layout nns-slide-stack">
      <div className="nns-neuron-viz">
        <div className="nns-neuron-flow">
          <div className="nns-inputs">
            {['x₁', 'x₂', 'x₃'].map((label) => (
              <div key={label} className="nns-input-node">
                <span>{label}</span>
              </div>
            ))}
          </div>
          <svg className="nns-neuron-wires" viewBox="0 0 72 120" aria-hidden="true">
            {inputY.map((y) => (
              <line
                key={y}
                x1="4"
                y1={y}
                x2="68"
                y2="60"
                stroke="#9ECFE0"
                strokeWidth="2"
                opacity="0.8"
              />
            ))}
          </svg>
          <div className="nns-neuron-center">
            <NeuronDot color="#1B78C2" />
            <span>Neuron</span>
          </div>
          <div className="nns-output-node">output</div>
        </div>
        <p className="nns-formula">weighted inputs → activation → output</p>
      </div>
      <div className="nns-card-grid nns-card-grid--2">
        <article className="nns-info-card">
          <h3>Role</h3>
          <p>
            Neurons combine multiple inputs into one signal. By stacking many neurons, the network can build
            complex patterns from simpler calculations.
          </p>
        </article>
        <article className="nns-info-card">
          <h3>Design choice</h3>
          <p>
            More neurons increase model capacity. Too few neurons can underfit; too many can make the model
            unnecessarily complex.
          </p>
        </article>
      </div>
    </div>
  );
}

function WeightsDiagram() {
  return (
    <div className="nns-weights-layout nns-slide-stack">
      <div className="nns-weights-viz">
        <div className="nns-weights-flow">
          <div className="nns-weight-inputs">
            <span>Input A</span>
            <span>Input B</span>
          </div>
          <svg className="nns-weight-wires" viewBox="0 0 80 100" aria-hidden="true">
            <line x1="4" y1="22" x2="76" y2="50" stroke="#7C3AED" strokeWidth="4" opacity="0.85" />
            <line x1="4" y1="78" x2="76" y2="50" stroke="#7C3AED" strokeWidth="1.5" opacity="0.45" />
          </svg>
          <div className="nns-neuron-center">
            <NeuronDot color="#7C3AED" />
            <span>Neuron</span>
          </div>
        </div>
        <div className="nns-weight-legend">
          <span>
            <em className="nns-weight-thick" /> larger weight — stronger influence
          </span>
          <span>
            <em className="nns-weight-thin" /> smaller weight — weaker influence
          </span>
        </div>
        <p className="nns-weight-loop">prediction error changes weights during training</p>
      </div>
      <div className="nns-card-grid nns-card-grid--2">
        <article className="nns-info-card">
          <h3>Definition</h3>
          <p>
            A weight is a numerical value attached to a connection. It tells the network how much importance
            to give to an incoming signal.
          </p>
        </article>
        <article className="nns-info-card">
          <h3>Training function</h3>
          <p>
            The network learns by repeatedly adjusting weights so future predictions produce a lower loss.
          </p>
        </article>
      </div>
      <p className="nns-playground-note">
        In the Playground, line thickness represents weight strength. Thicker lines show connections the model
        is using more strongly.
      </p>
    </div>
  );
}

function ActivationSlide() {
  const fns = [
    { name: 'tanh', curve: 'M10,90 Q50,10 90,90' },
    { name: 'sigmoid', curve: 'M10,90 Q50,20 90,10' },
    { name: 'ReLU', curve: 'M10,90 L50,90 L50,10 L90,10' },
  ];

  return (
    <div className="nns-activation">
      <div className="nns-card-grid nns-card-grid--2">
        <article className="nns-info-card">
          <h3>What they do</h3>
          <p>
            After a neuron combines its weighted inputs, the activation function transforms that value before
            passing it forward.
          </p>
        </article>
        <article className="nns-info-card">
          <h3>Why they matter</h3>
          <p>
            Without activation functions, even a deep network would behave like a mostly linear model and would
            struggle with curved or complex boundaries.
          </p>
        </article>
      </div>
      <div>
        <h3 className="nns-section-label">Common examples</h3>
        <div className="nns-fn-grid">
          {fns.map((fn) => (
            <div key={fn.name} className="nns-fn-card">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <path d={fn.curve} fill="none" stroke="#1B78C2" strokeWidth="3" />
              </svg>
              <span>{fn.name}</span>
            </div>
          ))}
        </div>
        <p className="nns-playground-note">
          In the Playground experiment, tanh was used to create smooth decision boundaries.
        </p>
      </div>
      <Callout title="Takeaway">
        Activation functions bend the decision boundary so the network can separate patterns that are not
        linearly separable.
      </Callout>
    </div>
  );
}

function LossOptimizationSlide() {
  const steps = [
    { n: '1', title: 'Predict', text: 'The network produces an output from the current weights.' },
    { n: '2', title: 'Measure loss', text: 'The loss function compares prediction with the correct answer.' },
    { n: '3', title: 'Update weights', text: 'The optimizer changes weights to reduce future error.' },
    { n: '4', title: 'Improve', text: 'The process repeats until loss becomes lower or training ends.' },
  ];

  return (
    <div className="nns-loss-opt nns-slide-stack">
      <div className="nns-steps">
        {steps.map((step, i) => (
          <div key={step.n} className="nns-step">
            <span className="nns-step-num">{step.n}</span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </div>
            {i < steps.length - 1 && <span className="nns-step-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <div className="nns-card-grid nns-card-grid--2">
        <article className="nns-info-card">
          <h3>Loss function</h3>
          <p>
            A loss function gives the model a score for how wrong it is. Lower training loss means the model is
            fitting the training examples better. Lower test loss suggests better generalization to unseen
            examples.
          </p>
        </article>
        <article className="nns-info-card">
          <h3>Optimization algorithm</h3>
          <p>
            An optimizer, such as gradient descent, decides how to adjust weights. The learning rate controls
            the size of each update: too small can be slow; too large can be unstable.
          </p>
        </article>
      </div>
      <p className="nns-playground-note">
        The Playground loss curve made this process visible: as training continued, the model adjusted weights
        and the loss generally decreased.
      </p>
    </div>
  );
}

function SummarySlide() {
  const items = [
    { title: 'Layers', text: 'create the processing structure from input to output.', color: '#25B7D3' },
    { title: 'Neurons', text: 'perform local calculations that transform incoming signals.', color: '#1B78C2' },
    { title: 'Weights', text: 'encode learned influence between connected neurons.', color: '#7C3AED' },
    {
      title: 'Activation functions',
      text: 'add non-linear learning power for complex boundaries.',
      color: '#F59E3D',
    },
    {
      title: 'Loss + optimization',
      text: 'guide feedback-based improvement during training.',
      color: '#25B7D3',
    },
  ];

  return (
    <div className="nns-summary nns-slide-stack">
      <p className="nns-summary-lead">
        A diagram turns an abstract algorithm into a clear learning process.
      </p>
      <ul className="nns-summary-list">
        {items.map((item) => (
          <li key={item.title}>
            <span className="nns-summary-dot" style={{ background: item.color }} aria-hidden="true" />
            <span>
              <strong>{item.title}</strong> {item.text}
            </span>
          </li>
        ))}
      </ul>
      <div className="nns-card-grid nns-card-grid--2">
        <article className="nns-info-card nns-info-card--highlight">
          <h3>Key insight from the exercise</h3>
          <p>
            The best network design depends on the data. Simple patterns may need only a small model, while
            noisy or complex patterns may require better features, more neurons, or deeper layers.
          </p>
        </article>
        <article className="nns-info-card nns-info-card--highlight">
          <h3>Most important lesson</h3>
          <p>
            More complexity is not always better. The goal is to match model capacity to the problem so the
            network learns useful patterns without unnecessary complexity.
          </p>
        </article>
      </div>
      <p className="nns-summary-close">
        Together, these components form a learning system that improves through repeated feedback.
      </p>
      <p className="nns-sources">
        Sources: TensorFlow Neural Network Playground; IWU Assignment 2.4 instructions; Goodfellow, Bengio,
        &amp; Courville (2016); Nielsen (2015).
      </p>
    </div>
  );
}

function TitleSlide({ author }: { author: string }) {
  return (
    <div className="nns-slide nns-slide-hero">
      <img className="nns-hero-bg" src={HERO_BG} alt="" aria-hidden="true" />
      <div className="nns-title-overlay" />
      <div className="nns-title-content">
        <h2 className="nns-title-heading">Understanding Neural Network Components</h2>
        <p className="nns-title-tagline">
          A concise visual guide to layers, neurons, weights, activation functions, loss functions, and
          optimization algorithms.
        </p>
        <div className="nns-title-accent" aria-hidden="true" />
        <p className="nns-title-meta">
          AIML501 - Assignment 2.4
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
    case 'architecture':
      return (
        <ContentSlide
          number={2}
          title="Overall Architecture: How Data Flows Forward"
          subtitle="The diagram shows the basic path from input features to a model prediction."
        >
          <ArchitectureDiagram />
        </ContentSlide>
      );
    case 'layers':
      return (
        <ContentSlide
          number={3}
          title="Component 1: Layers"
          subtitle="Layers organize the stages of processing inside a neural network."
        >
          <LayerCards />
        </ContentSlide>
      );
    case 'neurons':
      return (
        <ContentSlide
          number={4}
          title="Component 2: Neurons"
          subtitle="A neuron is the local calculation unit that transforms incoming signals."
        >
          <NeuronDiagram />
        </ContentSlide>
      );
    case 'weights':
      return (
        <ContentSlide
          number={5}
          title="Component 3: Weights"
          subtitle="Weights store learned influence between connected neurons."
        >
          <WeightsDiagram />
        </ContentSlide>
      );
    case 'activation':
      return (
        <ContentSlide
          number={6}
          title="Component 4: Activation Functions"
          subtitle="Activation functions allow the network to learn non-linear patterns."
        >
          <ActivationSlide />
        </ContentSlide>
      );
    case 'loss-optimization':
      return (
        <ContentSlide
          number={7}
          title="Components 5–6: Loss Functions and Optimization Algorithms"
          subtitle="Together, loss and optimization create the training feedback loop."
        >
          <LossOptimizationSlide />
        </ContentSlide>
      );
    case 'summary':
      return (
        <ContentSlide
          number={8}
          title="Summary: Why Visualizing Neural Networks Matters"
        >
          <SummarySlide />
        </ContentSlide>
      );
    default:
      return null;
  }
}

interface Props {
  author?: string;
}

export default function NeuralNetworkSlides({ author = 'May Hong' }: Props) {
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
    <div className="neural-network-slides" role="region" aria-label="Neural network presentation">
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
