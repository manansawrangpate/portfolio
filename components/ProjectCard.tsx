function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.22.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  );
}

export interface ProjectDetails {
  overview: string;
  images: string[];
  links: { label: string; href: string }[];
}

export interface Project {
  title: string;
  tools: string[];
  description: string;
  github?: string;
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
    <article className="group flex h-full flex-col rounded-card border border-border bg-surface p-5 transition-all duration-200 hover:border-green hover:shadow-[0_0_28px_rgba(79,195,247,0.12)]">
      {/* Title row */}
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-text leading-snug">
          {project.title}
        </h3>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="shrink-0 text-muted transition-colors hover:text-green"
          >
            <GithubIcon />
          </a>
        )}
      </div>

      {/* Tools */}
      <p className="font-mono text-[11px] text-muted">
        {project.tools.join(' · ')}
      </p>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">
        {project.description}
      </p>

      {/* View Details */}
      <button
        onClick={onOpenDetails}
        className="mt-5 self-start font-mono text-xs text-green transition-colors hover:text-text"
      >
        + View Details
      </button>
    </article>
  );
}
