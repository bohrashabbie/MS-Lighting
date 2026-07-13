/**
 * Route transition — remounts on every navigation, so each page glides in
 * with a soft rise. CSS-only; reduced motion disables it. The animation
 * leaves no persistent transform behind (no fill), so sticky/fixed children
 * behave normally once it finishes.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-t">{children}</div>;
}
