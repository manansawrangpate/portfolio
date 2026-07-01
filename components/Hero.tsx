'use client';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6 py-24"
    >
      {/* Background photo */}
      <img
        src={`${BASE}/toronto-at-dusk.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay so card text stays readable */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Info card */}
      <div
        className="fade-in relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 md:flex-row"
        style={{
          background: 'rgba(28, 28, 28, 0.90)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          animationDelay: '0.1s',
        }}
      >
        {/* Left — profile photo */}
        <div className="flex items-center justify-center p-8 md:w-5/12 md:border-r md:border-white/10">
          <div className="h-44 w-44 overflow-hidden rounded-full border-2 border-green sm:h-52 sm:w-52">
            <img
              src={`${BASE}/LinkedIn Photo.jpg`}
              alt="Manan Sawrangpate"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        {/* Right — info */}
        <div className="flex flex-col justify-center px-8 pb-10 pt-2 md:w-7/12 md:py-10 md:pl-8 md:pr-10">
          <p className="text-base font-normal text-muted">Hey there,</p>
          <h1
            className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl"
            style={{ textShadow: '0 0 40px rgba(79,195,247,0.18)' }}
          >
            I&apos;m Manan!
          </h1>

          <p className="mt-3 text-sm leading-6 text-text">
            I&apos;m currently an undergrad studying Robotics Engineering at the University of Toronto!
          </p>

          {/* Contact links */}
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-semibold text-green">Email:</span>
              <a
                href="mailto:manan.sawrangpate@mail.utoronto.ca"
                className="text-text transition-colors hover:text-green"
              >
                manan.sawrangpate@mail.utoronto.ca
              </a>
            </div>
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-semibold text-green">LinkedIn:</span>
              <a
                href="https://www.linkedin.com/in/manansawrangpate/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text transition-colors hover:text-green"
              >
                linkedin.com/in/manansawrangpate
              </a>
            </div>
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-semibold text-green">GitHub:</span>
              <a
                href="https://github.com/manansawrangpate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text transition-colors hover:text-green"
              >
                github.com/manansawrangpate
              </a>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap gap-3">
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
