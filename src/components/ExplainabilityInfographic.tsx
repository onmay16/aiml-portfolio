import { CircleHelp } from 'lucide-react';
import { useCallback, useState, type KeyboardEvent } from 'react';
import {
  INFOGRAPHIC_SUBTITLE,
  INFOGRAPHIC_TITLE,
  XAI_DEFINITION,
  defaultSelection,
  footerFormula,
  footerIcon,
  hubIcon,
  hubMessage,
  humanEvaluationIcon,
  humanEvaluationNote,
  industryApproaches,
  llmChallenges,
  validationMetrics,
  xaiBenefits,
  type IndustryApproach,
  type SelectableItem,
  type ValidationMetric,
  type XaiChallenge,
  type XaiIconName,
} from '../data/explainabilityInfographic';
import XaiIcon from './XaiIcon';

const CLICK_HINT =
  'Select a challenge, industry approach, or validation metric to expand details below the infographic.';

function selectionKey(item: SelectableItem) {
  return `${item.kind}-${item.item.id}`;
}

function SelectableCard({
  title,
  summary,
  icon,
  selected,
  onSelect,
  ariaLabel,
}: {
  title: string;
  summary: string;
  icon: XaiIconName;
  selected: boolean;
  onSelect: () => void;
  ariaLabel: string;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <button
      type="button"
      className={`xai-card${selected ? ' xai-card-selected' : ''}`}
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <span className="xai-card-icon" aria-hidden="true">
        <XaiIcon name={icon} size={18} />
      </span>
      <span className="xai-card-copy">
        <strong>{title}</strong>
        <span>{summary}</span>
      </span>
    </button>
  );
}

function DetailPanel({ selection }: { selection: SelectableItem }) {
  const { item } = selection;
  const title =
    selection.kind === 'industry'
      ? (item as IndustryApproach).org
      : (item as XaiChallenge | ValidationMetric).title;
  const summary =
    selection.kind === 'industry'
      ? (item as IndustryApproach).summary
      : (item as XaiChallenge | ValidationMetric).summary;
  const detail = item.detail;

  const badge =
    selection.kind === 'challenge'
      ? 'LLM challenge'
      : selection.kind === 'industry'
        ? 'Industry approach'
        : 'Validation metric';

  return (
    <div className="xai-detail" role="region" aria-live="polite" aria-label={`Details for ${title}`}>
      <div className="xai-detail-header">
        <span className="xai-detail-badge">{badge}</span>
        <h3 className="xai-detail-title">{title}</h3>
      </div>
      <p className="xai-detail-summary">{summary}</p>
      <p className="xai-detail-body">{detail}</p>
    </div>
  );
}

export default function ExplainabilityInfographic() {
  const [selection, setSelection] = useState<SelectableItem>(defaultSelection);

  const selectChallenge = useCallback((item: XaiChallenge) => {
    setSelection({ kind: 'challenge', item });
  }, []);

  const selectIndustry = useCallback((item: IndustryApproach) => {
    setSelection({ kind: 'industry', item });
  }, []);

  const selectMetric = useCallback((item: ValidationMetric) => {
    setSelection({ kind: 'metric', item });
  }, []);

  return (
    <div className="xai-infographic">
      <div className="xai-header-row">
        <p className="xai-lede">
          Explore four connected themes from the infographic: what XAI is, why LLMs are hard to explain,
          how industry improves transparency, and how validation metrics support trust.
        </p>
        <span className="xai-hint-badge" tabIndex={0}>
          <CircleHelp className="xai-hint-icon" size={14} strokeWidth={2.25} aria-hidden="true" />
          Interactive
          <span className="xai-tooltip" role="tooltip">
            {CLICK_HINT}
          </span>
        </span>
      </div>

      <div className="xai-poster">
        <header className="xai-poster-header">
          <h3 className="xai-poster-title">{INFOGRAPHIC_TITLE}</h3>
          <p className="xai-poster-subtitle">{INFOGRAPHIC_SUBTITLE}</p>
        </header>

        <div className="xai-grid">
          <section className="xai-panel xai-panel-definition" aria-labelledby="xai-section-1">
            <div className="xai-section-heading">
              <span className="xai-section-num" aria-hidden="true">
                1
              </span>
              <h4 id="xai-section-1">What is Explainable AI (XAI)?</h4>
            </div>
            <blockquote className="xai-definition">{XAI_DEFINITION}</blockquote>
            <ul className="xai-benefits">
              {xaiBenefits.map((benefit) => (
                <li key={benefit.id}>
                  <span className="xai-benefit-icon" aria-hidden="true">
                    <XaiIcon name={benefit.icon} size={16} />
                  </span>
                  {benefit.label}
                </li>
              ))}
            </ul>
          </section>

          <section className="xai-panel xai-panel-challenges" aria-labelledby="xai-section-2">
            <div className="xai-section-heading">
              <span className="xai-section-num" aria-hidden="true">
                2
              </span>
              <h4 id="xai-section-2">Why LLMs Are Hard to Explain</h4>
            </div>
            <div className="xai-card-list" role="group" aria-label="LLM explainability challenges">
              {llmChallenges.map((challenge) => (
                <SelectableCard
                  key={challenge.id}
                  title={challenge.title}
                  summary={challenge.summary}
                  icon={challenge.icon}
                  selected={
                    selection.kind === 'challenge' && selection.item.id === challenge.id
                  }
                  onSelect={() => selectChallenge(challenge)}
                  ariaLabel={`${challenge.title}. ${challenge.summary}`}
                />
              ))}
            </div>
          </section>

          <section className="xai-panel xai-panel-industry" aria-labelledby="xai-section-3">
            <div className="xai-section-heading">
              <span className="xai-section-num" aria-hidden="true">
                3
              </span>
              <h4 id="xai-section-3">How Industry Improves Transparency</h4>
            </div>
            <div className="xai-card-list xai-card-list-industry" role="group" aria-label="Industry transparency approaches">
              {industryApproaches.map((approach) => (
                <SelectableCard
                  key={approach.id}
                  title={approach.org}
                  summary={approach.summary}
                  icon={approach.icon}
                  selected={selection.kind === 'industry' && selection.item.id === approach.id}
                  onSelect={() => selectIndustry(approach)}
                  ariaLabel={`${approach.org}. ${approach.summary}`}
                />
              ))}
            </div>
          </section>

          <section className="xai-panel xai-panel-metrics" aria-labelledby="xai-section-4">
            <div className="xai-section-heading">
              <span className="xai-section-num" aria-hidden="true">
                4
              </span>
              <h4 id="xai-section-4">Validation &amp; Performance Metrics</h4>
            </div>

            <div className="xai-metrics-layout">
              <div className="xai-hub-center" aria-hidden="true">
                <XaiIcon name={hubIcon} className="xai-hub-shield" size={22} strokeWidth={1.5} />
                <p>{hubMessage}</p>
              </div>

              <div className="xai-metrics-columns" role="group" aria-label="Validation and performance metrics">
                <div className="xai-metrics-col">
                  {validationMetrics.slice(0, 3).map((metric) => (
                    <button
                      key={metric.id}
                      type="button"
                      className={`xai-spoke${
                        selection.kind === 'metric' && selection.item.id === metric.id
                          ? ' xai-spoke-selected'
                          : ''
                      }`}
                      aria-pressed={selection.kind === 'metric' && selection.item.id === metric.id}
                      aria-label={`${metric.title}. ${metric.summary}`}
                      onClick={() => selectMetric(metric)}
                    >
                      <span className="xai-spoke-icon" aria-hidden="true">
                        <XaiIcon name={metric.icon} size={18} />
                      </span>
                      <span className="xai-spoke-label">{metric.title}</span>
                    </button>
                  ))}
                </div>
                <div className="xai-metrics-col">
                  {validationMetrics.slice(3).map((metric) => (
                    <button
                      key={metric.id}
                      type="button"
                      className={`xai-spoke${
                        selection.kind === 'metric' && selection.item.id === metric.id
                          ? ' xai-spoke-selected'
                          : ''
                      }`}
                      aria-pressed={selection.kind === 'metric' && selection.item.id === metric.id}
                      aria-label={`${metric.title}. ${metric.summary}`}
                      onClick={() => selectMetric(metric)}
                    >
                      <span className="xai-spoke-icon" aria-hidden="true">
                        <XaiIcon name={metric.icon} size={18} />
                      </span>
                      <span className="xai-spoke-label">{metric.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="xai-human-eval">
                <XaiIcon name={humanEvaluationIcon} size={16} aria-hidden="true" />
                {humanEvaluationNote}
              </p>
            </div>
          </section>
        </div>

        <footer className="xai-formula">
          <XaiIcon name={footerIcon} className="xai-formula-icon" size={20} strokeWidth={1.5} />
          {footerFormula}
        </footer>
      </div>

      <DetailPanel key={selectionKey(selection)} selection={selection} />
    </div>
  );
}
