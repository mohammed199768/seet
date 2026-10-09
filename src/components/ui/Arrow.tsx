/** Chunky arrow with rounded terminals, drawn to sit beside LamaSans Bold. Points "forward" (mirrored in RTL via CSS). */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 12h15M13 5.5 19.5 12 13 18.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
