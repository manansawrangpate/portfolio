'use client';

import { useEffect } from 'react';
import type { Project } from './ProjectCard';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.22.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  );
}

function imgSrc(src: string): string {
  return src.startsWith('http') ? src : `${BASE}/${src}`;
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const { details } = project;
  const colClass = details.images.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-16">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75"
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-5xl rounded-2xl border border-border bg-surface p-10">

        {/* Header */}
        <div className="mb-7 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-4xl font-semibold text-text">
              {project.title}
            </h2>
            <p className="mt-2 font-mono text-sm text-muted">
              {project.tools.join(' · ')}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted transition-colors hover:text-green"
              >
                <GithubIcon />
              </a>
            )}
            {details.links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-muted transition-colors hover:text-green"
              >
                {label} ↗
              </a>
            ))}
            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-1 text-2xl leading-none text-muted transition-colors hover:text-text"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Images — shown ABOVE the overview text */}
        {details.images.length > 0 && (
          <div className={`mb-7 grid gap-4 ${colClass}`}>
            {details.images.map(({ src, caption }) => (
              <figure key={src} className="flex flex-col">
                <div className="h-72 overflow-hidden rounded-lg">
                  <img
                    src={imgSrc(src)}
                    alt={caption ?? ''}
                    className="h-full w-full object-contain"
                  />
                </div>
                {caption && (
                  <figcaption className="mt-2 text-center text-xs italic text-muted">
                    {caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* Overview */}
        <div className="space-y-4 text-sm leading-7 text-muted">
          {details.overview.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
