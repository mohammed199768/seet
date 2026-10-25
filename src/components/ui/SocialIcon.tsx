export function SocialIcon({
  network,
  className = "",
}: {
  network: "whatsapp" | "instagram" | "facebook";
  className?: string;
}) {
  if (network === "facebook") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.3H8.3V13H11v8h3.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (network === "instagram") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.4" cy="6.7" r="1.15" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.4 11.7a8.4 8.4 0 0 1-12.3 7.4L3.5 20.5l1.4-4.4A8.4 8.4 0 1 1 20.4 11.7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 7.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.5l.7 1.7c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.6 1.1 1.5 2 2.6 2.6.3.2.5.2.7 0l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.2.5.3.5.5 0 .2-.1 1.2-.7 1.7-.5.5-1.3.8-2.1.7-1.1-.1-2.8-.7-4.6-2.3-2.1-1.9-3.2-4.2-3.3-5.4 0-.6.1-1.1.4-1.4.2-.3.4-.5.5-.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
