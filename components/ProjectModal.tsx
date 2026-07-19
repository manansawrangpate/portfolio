'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Project } from './ProjectCard';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function imgSrc(src: string): string {
  return src.startsWith('http') ? src : `${BASE}/${src}`;
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.22.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ImageCarousel({ images }: { images: { src: string; caption?: string }[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => {
    setIdx(i => (i - 1 + images.length) % images.length);
    setPaused(true);
  }, [images.length]);

  const next = useCallback(() => {
    setIdx(i => (i + 1) % images.length);
    setPaused(true);
  }, [images.length]);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [paused, images.length]);

  // Resume auto-advance 6 s after last manual interaction
  useEffect(() => {
    if (!paused) return;
    const t = setTimeout(() => setPaused(false), 6000);
    return () => clearTimeout(t);
  }, [paused, idx]);

  if (!images.length) return null;

  return (
    <div className="mb-7">
      {/* Image area */}
      <div className="relative overflow-hidden rounded-xl bg-bg" style={{ height: '340px' }}>
        {images.map((img, i) => (
          <img
            key={img.src}
            src={imgSrc(img.src)}
            alt={img.caption ?? ''}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
              i === idx ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 transition-all hover:bg-black/75 hover:text-white"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 transition-all hover:bg-black/75 hover:text-white"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <span className="absolute right-3 bottom-3 rounded-full bg-black/50 px-2.5 py-0.5 font-mono text-xs text-white/70">
            {idx + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Caption + dots */}
      <div className="mt-3 flex flex-col items-center gap-2">
        {images[idx].caption && (
          <p className="text-center text-sm italic text-muted">{images[idx].caption}</p>
        )}
        {images.length > 1 && (
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIdx(i); setPaused(true); }}
                aria-label={`Photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? 'w-5 bg-green' : 'w-1.5 bg-muted/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
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
                className="font-mono text-sm text-text transition-colors hover:text-green"
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

        {/* Image carousel */}
        <ImageCarousel images={details.images} />

        {/* Overview */}
        <div className="space-y-4 text-base leading-7 text-[#a0a0a0]">
          {details.overview.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
