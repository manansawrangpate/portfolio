type DotColor = 'green' | 'blue' | 'white' | 'purple' | 'yellow' | 'pink';

const DOT_CLASS: Record<DotColor, string> = {
  green: 'bg-green',
  blue: 'bg-blue',
  white: 'bg-text',
  purple: 'bg-purple',
  yellow: 'bg-yellow',
  pink: 'bg-pink',
};

export default function SkillGroup({
  label,
  dot,
  skills,
}: {
  label: string;
  dot: DotColor;
  skills: string[];
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`inline-block h-2 w-2 rounded-full ${DOT_CLASS[dot]}`}
          aria-hidden="true"
        />
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="badge">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
