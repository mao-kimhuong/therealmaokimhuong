export default function BracketHeading({ children, className = "" }: { children: string; className?: string }) {
  return (
    <h2 className={`heading-h2 ${className}`} data-bracket-heading>
      <span className="heading-bracket is--left" data-bracket-left aria-hidden="true">[</span>
      {children}
      <span className="heading-bracket is--right" data-bracket-right aria-hidden="true">]</span>
    </h2>
  );
}
