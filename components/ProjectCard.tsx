'use client';

import { useState, useEffect } from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function imgSrc(src: string): string {
  return src.startsWith('http') ? src : `${BASE}/${src}`;
}

function CardPhotoSlider({ images }: { images: ProjectImage[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div className="relative mb-4 h-44 w-full overflow-hidden rounded-lg bg-bg">
      {images.map((img, i) => (
        <img
          key={img.src}
          src={imgSrc(img.src)}
          alt={img.caption ?? ''}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Photo ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.22.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export interface ProjectImage {
  src: string;
  caption?: string;
}

export interface ProjectDetails {
  overview: string;
  images: ProjectImage[];
  links: { label: string; href: string }[];
}

export interface Project {
  title: string;
  tools: string[];
  description: string;
  github?: string;
  report?: string;
  details: ProjectDetails;
}

export default function ProjectCard({
  project,
  onOpenDetails,
}: {
  project: Project;
  onOpenDetails: () => void;
}) {
  return (
    <article className="group flex h-full flex-col rounded-card border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1">
      {/* Photo slider */}
      <CardPhotoSlider images={project.details.images} />

      {/* Title row */}
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-white leading-snug">
          {project.title}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          {project.report && (
            <a
              href={project.report}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} final report`}
              className="text-muted transition-colors hover:text-green"
            >
              <ReportIcon />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="text-muted transition-colors hover:text-green"
            >
              <GithubIcon />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-2 flex-1 text-base leading-6 text-[#a0a0a0]">
        {project.description}
      </p>

      {/* Tools — auto-scrolling marquee */}
      <div className="mt-4 overflow-hidden">
        <div className="marquee-track gap-1.5">
          {[...project.tools, ...project.tools].map((tool, i) => (
            <span key={i} className="badge shrink-0 mr-1.5">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* View Details */}
      <button
        onClick={onOpenDetails}
        className="mt-4 self-start font-mono text-sm text-text transition-colors hover:text-green"
      >
        + View Details
      </button>
    </article>
  );
}
