'use client';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-20"
    >
      <div className="flex w-full flex-col gap-12 md:flex-row md:items-center md:justify-between">
        {/* Left column — photo */}
        <div className="fade-in flex justify-center md:w-2/5 md:justify-start" style={{ animationDelay: '0.15s' }}>
          <div
            className="h-60 w-60 overflow-hidden rounded-full border-2 border-green sm:h-72 sm:w-72"
            style={{}}
          >
            <img
              src={`${BASE}/LinkedIn Photo.jpg`}
              alt="Manan Sawrangpate"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="w-full md:w-3/5">
          <div className="fade-in" style={{ animationDelay: '0s' }}>
            <p className="text-xl font-normal text-muted">Hey there,</p>
            <h1
              className="font-display text-5xl font-bold tracking-tight text-text sm:text-6xl"
              style={{ textShadow: '0 0 40px rgba(79,195,247,0.18)' }}
            >
              I&apos;m Manan!
            </h1>
          </div>

          <p className="fade-in mt-4 text-base leading-7 text-text" style={{ animationDelay: '0.12s' }}>
            I&apos;m currently an undergrad studying Robotics Engineering at the University of Toronto!
          </p>

          {/* Contact links */}
          <div className="fade-in mt-7 space-y-2 text-sm" style={{ animationDelay: '0.24s' }}>
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-semibold text-green">Email:</span>
              <a href="mailto:manan.sawrangpate@mail.utoronto.ca" className="text-text transition-colors hover:text-green">
                manan.sawrangpate@mail.utoronto.ca
              </a>
            </div>
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-semibold text-green">LinkedIn:</span>
              <a href="https://www.linkedin.com/in/manansawrangpate/" target="_blank" rel="noopener noreferrer" className="text-text transition-colors hover:text-green">
                linkedin.com/in/manansawrangpate
              </a>
            </div>
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-semibold text-green">GitHub:</span>
              <a href="https://github.com/manansawrangpate" target="_blank" rel="noopener noreferrer" className="text-text transition-colors hover:text-green">
                github.com/manansawrangpate
              </a>
            </div>
          </div>

          {/* CTAs */}
          <div className="fade-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: '0.36s' }}>
            <a
              href="#projects"
              className="rounded-badge bg-green px-5 py-2.5 text-sm font-semibold text-[#1e1e1e] transition-transform duration-200 hover:-translate-y-0.5"
            >
              See my work
            </a>
            <a
              href={`${BASE}/about/`}
              className="rounded-badge border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors duration-200 hover:border-green hover:text-green"
            >
              About Me
            </a>
            <a
              href={`${BASE}/resume/`}
              className="rounded-badge border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors duration-200 hover:border-green hover:text-green"
            >
              Resume &amp; Portfolio
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
