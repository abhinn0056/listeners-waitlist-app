type LogoProps = {
  className?: string
  title?: string
}

/**
 * The Listeners mark: two thick curved arms shaped like open parentheses
 * pointing upward, with a filled circle centered between them.
 * Uses `currentColor` so it can be themed; brand color is #1E1B4B.
 */
export function Logo({ className, title = 'Listeners' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      {/* Left arm — open parenthesis curving up */}
      <path
        d="M40 102 C 18 84, 18 44, 40 22"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right arm — open parenthesis curving up */}
      <path
        d="M80 102 C 102 84, 102 44, 80 22"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      {/* Centered filled circle */}
      <circle cx="60" cy="58" r="12" fill="currentColor" />
    </svg>
  )
}
