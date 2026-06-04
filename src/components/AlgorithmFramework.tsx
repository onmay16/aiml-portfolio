import { useCallback, useState, type CSSProperties } from 'react';
import {
  algorithms,
  algorithmsById,
  defaultAlgorithmId,
  type AlgorithmNode,
  type Domain,
} from '../data/algorithms';

const domainLabels: Record<Domain, string> = {
  tabular: 'Tabular',
  vision: 'Vision',
  'nlp-genai': 'NLP / GenAI',
  clustering: 'Clustering',
  'dimensionality-reduction': 'Dimensionality Reduction',
};

const supervisedDomains: { domain: Domain; ids: string[] }[] = [
  { domain: 'tabular', ids: ['linear-regression', 'decision-tree', 'random-forest', 'svm'] },
  { domain: 'vision', ids: ['cnn'] },
  { domain: 'nlp-genai', ids: ['transformer'] },
];

const unsupervisedDomains: { domain: Domain; ids: string[] }[] = [
  { domain: 'clustering', ids: ['k-means'] },
  { domain: 'dimensionality-reduction', ids: ['pca'] },
];

const CLICK_HINT =
  'Each algorithm block below is clickable. Select one to view its type, domains, use cases, and how it works.';

function learningStyleLabel(style: AlgorithmNode['learningStyle']) {
  return style === 'supervised' ? 'Supervised' : 'Unsupervised';
}

function Connector({ className = '' }: { className?: string }) {
  return <div className={`af-connector-v${className ? ` ${className}` : ''}`} aria-hidden="true" />;
}

function HRail({
  cols,
  colGap = '0.75rem',
  className = '',
}: {
  cols: number;
  colGap?: string;
  className?: string;
}) {
  const style = {
    '--af-cols': cols,
    '--af-col-gap': colGap,
  } as CSSProperties;

  return (
    <div
      className={`af-h-rail${className ? ` ${className}` : ''}`}
      style={style}
      aria-hidden="true"
    />
  );
}

interface LeafButtonProps {
  node: AlgorithmNode;
  selected: boolean;
  onSelect: (id: string) => void;
}

function LeafButton({ node, selected, onSelect }: LeafButtonProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(node.id);
    }
  };

  return (
    <button
      type="button"
      className={`af-node af-node-leaf${selected ? ' af-node-selected' : ''}`}
      aria-selected={selected}
      title="Click to view details"
      onClick={() => onSelect(node.id)}
      onKeyDown={handleKeyDown}
    >
      <span className="af-leaf-label">{node.label}</span>
      <span className="af-leaf-click-icon" aria-hidden="true">
        ↗
      </span>
    </button>
  );
}

function DomainColumn({
  domain,
  ids,
  selectedId,
  onSelect,
}: {
  domain: Domain;
  ids: string[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="af-domain-col" role="group" aria-label={domainLabels[domain]}>
      <Connector />
      <div className="af-node af-node-domain">{domainLabels[domain]}</div>
      <Connector className="af-connector-mid" />
      <div className="af-leaves" role="group">
        {ids.map((id) => {
          const node = algorithmsById[id];
          return (
            <LeafButton
              key={id}
              node={node}
              selected={selectedId === id}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}

function BranchSection({
  label,
  ariaLabel,
  domains,
  gridClass,
  selectedId,
  onSelect,
}: {
  label: string;
  ariaLabel: string;
  domains: { domain: Domain; ids: string[] }[];
  gridClass: string;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const colsStyle = { '--af-cols': domains.length } as CSSProperties;

  return (
    <div className="af-branch" role="group" aria-label={ariaLabel}>
      <Connector />
      <div className="af-node af-node-branch">{label}</div>
      <div className="af-trunk">
        <Connector />
        <HRail cols={domains.length} />
        <div className={`af-domains ${gridClass}`} style={colsStyle}>
          {domains.map(({ domain, ids }) => (
            <DomainColumn
              key={domain}
              domain={domain}
              ids={ids}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface Props {
  subtitle?: string;
}

export default function AlgorithmFramework({ subtitle }: Props) {
  const [selectedId, setSelectedId] = useState<string>(defaultAlgorithmId);
  const selected = algorithmsById[selectedId];

  const onSelect = useCallback((id: string) => setSelectedId(id), []);

  const splitColsStyle = { '--af-cols': 2, '--af-col-gap': '2.5rem' } as CSSProperties;

  return (
    <div className="algorithm-framework">
      <div className="af-header-row">
        {subtitle && <p className="af-subtitle">{subtitle}</p>}
        <span className="af-hint-badge" tabIndex={0}>
          <span className="af-hint-icon" aria-hidden="true">
            ?
          </span>
          Clickable
          <span className="af-tooltip" role="tooltip">
            {CLICK_HINT}
          </span>
        </span>
      </div>

      <div className="af-tree" role="tree" aria-label="Machine learning algorithm taxonomy">
        <div className="af-split-block" style={splitColsStyle}>
          <div className="af-root-section">
            <div className="af-node af-node-root" aria-hidden="true">
              Machine Learning Algorithms
            </div>
            <Connector />
          </div>
          <HRail cols={2} colGap="2.5rem" />
          <div className="af-tier af-tier-split">
            <BranchSection
              label="Supervised Learning"
              ariaLabel="Supervised learning branch"
              domains={supervisedDomains}
              gridClass="af-domains-supervised"
              selectedId={selectedId}
              onSelect={onSelect}
            />

            <BranchSection
              label="Unsupervised Learning"
              ariaLabel="Unsupervised learning branch"
              domains={unsupervisedDomains}
              gridClass="af-domains-unsupervised"
              selectedId={selectedId}
              onSelect={onSelect}
            />
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="af-detail"
          role="region"
          aria-live="polite"
          aria-label={`Details for ${selected.label}`}
        >
          <h3 className="af-detail-title">{selected.label}</h3>
          <div className="af-badges">
            <span className={`af-badge af-badge-${selected.learningStyle}`}>
              {learningStyleLabel(selected.learningStyle)}
            </span>
            {selected.domains.map((d) => (
              <span key={d} className="af-badge af-badge-domain">
                {d}
              </span>
            ))}
          </div>

          <div className="af-detail-grid">
            <div className="af-detail-block">
              <h4>Example applications</h4>
              <ul>
                {selected.useCases.map((uc) => (
                  <li key={uc}>{uc}</li>
                ))}
              </ul>
            </div>
            <div className="af-detail-block">
              <h4>How it works</h4>
              <p>{selected.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
