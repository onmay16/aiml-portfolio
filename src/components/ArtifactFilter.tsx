import { useMemo, useState } from 'react';

export interface ArtifactSummary {
  slug: string;
  title: string;
  introduction: string;
  tools: string[];
  href: string;
}

interface Props {
  artifacts: ArtifactSummary[];
}

export default function ArtifactFilter({ artifacts }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return artifacts;
    return artifacts.filter((a) => {
      const haystack = [a.title, a.introduction, ...a.tools].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [artifacts, query]);

  return (
    <>
      <div className="filter-bar">
        <label htmlFor="artifact-search" className="visually-hidden">
          Search artifacts
        </label>
        <input
          id="artifact-search"
          type="search"
          placeholder="Search by title, tool, or keyword…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-describedby="filter-count"
        />
        <span id="filter-count" className="filter-count">
          Showing {filtered.length} of {artifacts.length} artifacts
        </span>
      </div>
      <div className="artifact-grid">
        {filtered.length === 0 ? (
          <p>No artifacts match your search. Try a different keyword.</p>
        ) : (
          filtered.map((a) => (
            <a key={a.slug} href={a.href} className="artifact-card animate-in">
              <div className="artifact-card-body">
                <h3>{a.title}</h3>
                <p>{a.introduction}</p>
                {a.tools.length > 0 && (
                  <div className="artifact-card-tools">
                    {a.tools.slice(0, 4).map((tool) => (
                      <span key={tool} className="tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))
        )}
      </div>
    </>
  );
}
