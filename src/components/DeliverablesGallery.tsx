import { useCallback, useEffect, useState } from 'react';

export interface Deliverable {
  type: 'image' | 'pdf' | 'link' | 'code';
  url: string;
  caption: string;
}

interface Props {
  deliverables: Deliverable[];
  baseUrl: string;
}

function resolveUrl(baseUrl: string, url: string) {
  if (url.startsWith('http')) return url;
  return `${baseUrl}${url.replace(/^\//, '')}`;
}

export default function DeliverablesGallery({ deliverables, baseUrl }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    if (!lightboxSrc) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxSrc, closeLightbox]);

  return (
    <>
      <div className="deliverables-grid">
        {deliverables.map((item, i) => {
          const href = resolveUrl(baseUrl, item.url);
          if (item.type === 'image') {
            return (
              <figure key={i} className="deliverable-item">
                <button type="button" onClick={() => setLightboxSrc(href)} aria-label={`View ${item.caption}`}>
                  <img src={href} alt={item.caption} width={320} height={180} loading="lazy" />
                </button>
                <figcaption className="deliverable-caption">{item.caption}</figcaption>
              </figure>
            );
          }
          return (
            <figure key={i} className="deliverable-item">
              <a
                className="deliverable-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.type === 'pdf' ? '📄 ' : item.type === 'code' ? '💻 ' : '🔗 '}
                {item.caption}
              </a>
            </figure>
          );
        })}
      </div>
      {lightboxSrc && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closeLightbox}
        >
          <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close preview">
            ×
          </button>
          <img
            src={lightboxSrc}
            alt="Enlarged deliverable preview"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
