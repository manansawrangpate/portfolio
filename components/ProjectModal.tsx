'use client';

import { useEffect } from 'react';
import type { Project } from './ProjectCard';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

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
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-border bg-surface p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-text">
              {project.title}
            </h2>
            <p className="mt-1 font-mono text-xs text-muted">
              {project.tools.join(' · ')}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 text-xl leading-none text-muted transition-colors hover:text-text"
          >
            ✕
          </button>
        </div>

        {/* Overview */}
        <div className="space-y-4 text-sm leading-7 text-muted">
          {details.overview.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Images — drop .jpg/.png into public/projects/ and add paths to details.images */}
        {details.images.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {details.images.map((src) => (
              <img
                key={src}
                src={`${BASE}/${src}`}
                alt=""
                className="aspect-video w-full rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        {/* Links — add YouTube, Google Drive, docs etc. to details.links */}
        {(details.links.length > 0 || project.github) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {details.links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-badge border border-green px-4 py-2 text-sm font-medium text-green transition-colors hover:bg-green hover:text-[#1e1e1e]"
              >
                {label} ↗
              </a>
            ))}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-badge border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-green hover:text-green"
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
