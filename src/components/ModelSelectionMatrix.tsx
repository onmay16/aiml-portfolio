import { CircleHelp, Image, MessageSquare, Table2 } from 'lucide-react';
import { useCallback, useMemo, useState, type KeyboardEvent } from 'react';
import {
  MATRIX_INTRO,
  MATRIX_SUBTITLE,
  MATRIX_TITLE,
  defaultModelId,
  domainFilters,
  models,
  recommendations,
  tradeOffInsights,
  type Domain,
  type ModelEntry,
  type RatingLevel,
  type Recommendation,
  type TradeOffInsight,
} from '../data/modelSelectionMatrix';

const CLICK_HINT =
  'Select a model row, trade-off insight, or recommendation to expand details below the matrix.';

type Selection =
  | { kind: 'model'; item: ModelEntry }
  | { kind: 'insight'; item: TradeOffInsight }
  | { kind: 'recommendation'; item: Recommendation };

function selectionKey(selection: Selection) {
  return `${selection.kind}-${selection.item.id}`;
}

function domainIcon(domain: Domain) {
  if (domain === 'nlp') return MessageSquare;
  if (domain === 'vision') return Image;
  return Table2;
}

function RatingDot({ level, label }: { level: RatingLevel; label: string }) {
  return (
    <span className="msm-rating" title={label}>
      <span className={`msm-dot msm-dot-${level}`} aria-hidden="true" />
      <span className="msm-rating-label">{label}</span>
    </span>
  );
}

function DomainBadge({ domain }: { domain: Domain }) {
  const Icon = domainIcon(domain);
  return (
    <span className={`msm-domain msm-domain-${domain}`}>
      <Icon size={14} aria-hidden="true" />
      {domain === 'nlp' ? 'NLP' : domain === 'vision' ? 'Vision' : 'Tabular'}
    </span>
  );
}

function DetailPanel({ selection }: { selection: Selection }) {
  if (selection.kind === 'model') {
    const { item } = selection;
    return (
      <div className="msm-detail" role="region" aria-live="polite" aria-label={`Details for ${item.name}`}>
        <div className="msm-detail-header">
          <span className="msm-detail-badge">Model profile</span>
          <h3 className="msm-detail-title">{item.name}</h3>
          <DomainBadge domain={item.domain} />
        </div>
        <p className="msm-detail-summary">{item.summary}</p>
        <p className="msm-detail-body">{item.detail}</p>
        <div className="msm-detail-columns">
          <div>
            <h4>Strengths</h4>
            <ul>
              {item.strengths.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Weaknesses</h4>
            <ul>
              {item.weaknesses.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const title =
    selection.kind === 'insight' ? selection.item.title : selection.item.label;
  const badge = selection.kind === 'insight' ? 'Trade-off insight' : 'Recommendation';
  const body =
    selection.kind === 'insight'
      ? selection.item.detail
      : selection.item.detail;
  const summary =
    selection.kind === 'insight'
      ? selection.item.summary
      : selection.item.models;

  return (
    <div className="msm-detail" role="region" aria-live="polite" aria-label={`Details for ${title}`}>
      <div className="msm-detail-header">
        <span className="msm-detail-badge">{badge}</span>
        <h3 className="msm-detail-title">{title}</h3>
      </div>
      <p className="msm-detail-summary">{summary}</p>
      <p className="msm-detail-body">{body}</p>
    </div>
  );
}

export default function ModelSelectionMatrix() {
  const defaultModel = models.find((m) => m.id === defaultModelId) ?? models[0];
  const [domainFilter, setDomainFilter] = useState<Domain | 'all'>('all');
  const [selection, setSelection] = useState<Selection>({ kind: 'model', item: defaultModel });

  const filteredModels = useMemo(
    () => (domainFilter === 'all' ? models : models.filter((m) => m.domain === domainFilter)),
    [domainFilter],
  );

  const selectModel = useCallback((item: ModelEntry) => {
    setSelection({ kind: 'model', item });
  }, []);

  const selectInsight = useCallback((item: TradeOffInsight) => {
    setSelection({ kind: 'insight', item });
  }, []);

  const selectRecommendation = useCallback((item: Recommendation) => {
    setSelection({ kind: 'recommendation', item });
  }, []);

  const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, item: ModelEntry) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectModel(item);
    }
  };

  const selectedModelId = selection.kind === 'model' ? selection.item.id : null;

  return (
    <div className="msm-matrix">
      <div className="msm-header-row">
        <p className="msm-lede">{MATRIX_INTRO}</p>
        <span className="msm-hint-badge" tabIndex={0}>
          <CircleHelp className="msm-hint-icon" size={14} strokeWidth={2.25} aria-hidden="true" />
          Interactive
          <span className="msm-tooltip" role="tooltip">
            {CLICK_HINT}
          </span>
        </span>
      </div>

      <div className="msm-poster">
        <header className="msm-poster-header">
          <h3 className="msm-poster-title">{MATRIX_TITLE}</h3>
          <p className="msm-poster-subtitle">{MATRIX_SUBTITLE}</p>
        </header>

        <div className="msm-filter-row" role="tablist" aria-label="Filter models by domain">
          {domainFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={domainFilter === filter.id}
              className={`msm-filter-tab${domainFilter === filter.id ? ' msm-filter-tab-active' : ''}`}
              onClick={() => setDomainFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="msm-table-wrap">
          <table className="msm-table">
            <caption className="sr-only">
              Comparison of five pre-trained models by domain, size, accuracy, speed, explainability, and best use case
            </caption>
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col">Domain</th>
                <th scope="col">Size</th>
                <th scope="col">Accuracy / Performance</th>
                <th scope="col">Speed</th>
                <th scope="col">Explainability</th>
                <th scope="col">Best Use Case</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((model) => {
                const selected = selectedModelId === model.id;
                return (
                  <tr
                    key={model.id}
                    className={selected ? 'msm-row-selected' : ''}
                    tabIndex={0}
                    aria-selected={selected}
                    onClick={() => selectModel(model)}
                    onKeyDown={(event) => handleRowKeyDown(event, model)}
                  >
                    <th scope="row">{model.name}</th>
                    <td>
                      <DomainBadge domain={model.domain} />
                    </td>
                    <td>{model.size}</td>
                    <td>{model.accuracy}</td>
                    <td>
                      <RatingDot level={model.speed.level} label={model.speed.label} />
                    </td>
                    <td>
                      <RatingDot level={model.explainability.level} label={model.explainability.label} />
                    </td>
                    <td>{model.bestUseCase}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="msm-legend" aria-label="Rating legend">
          <span className="msm-legend-title">Rating scale</span>
          <span className="msm-legend-item">
            <span className="msm-dot msm-dot-high" aria-hidden="true" /> High / Fast
          </span>
          <span className="msm-legend-item">
            <span className="msm-dot msm-dot-medium" aria-hidden="true" /> Medium
          </span>
          <span className="msm-legend-item">
            <span className="msm-dot msm-dot-low" aria-hidden="true" /> Low / Slow
          </span>
        </div>

        <div className="msm-bottom-grid">
          <section className="msm-panel" aria-labelledby="msm-insights-heading">
            <h4 id="msm-insights-heading">Key Trade-Off Insights</h4>
            <div className="msm-card-list" role="group" aria-label="Key trade-off insights">
              {tradeOffInsights.map((insight) => {
                const selected =
                  selection.kind === 'insight' && selection.item.id === insight.id;
                return (
                  <button
                    key={insight.id}
                    type="button"
                    className={`msm-card${selected ? ' msm-card-selected' : ''}`}
                    aria-pressed={selected}
                    onClick={() => selectInsight(insight)}
                  >
                    <strong>{insight.title}</strong>
                    <span>{insight.summary}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="msm-panel" aria-labelledby="msm-recs-heading">
            <h4 id="msm-recs-heading">Recommendations</h4>
            <div className="msm-card-list" role="group" aria-label="Model recommendations">
              {recommendations.map((rec) => {
                const selected =
                  selection.kind === 'recommendation' && selection.item.id === rec.id;
                return (
                  <button
                    key={rec.id}
                    type="button"
                    className={`msm-card msm-card-rec${selected ? ' msm-card-selected' : ''}`}
                    aria-pressed={selected}
                    onClick={() => selectRecommendation(rec)}
                  >
                    <strong>{rec.label}</strong>
                    <span>{rec.models}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <DetailPanel key={selectionKey(selection)} selection={selection} />
    </div>
  );
}
