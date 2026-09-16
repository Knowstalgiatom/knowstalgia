import type { ReactNode } from "react";

/**
 * Mobile-first page container. Full-bleed on phones, gains side padding
 * and a max-width once there's room to spare — same shell for every
 * screen so nothing has to reinvent horizontal rhythm.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-md mx-auto px-5 sm:max-w-lg sm:px-6 ${className}`}
    >
      {children}
    </div>
  );
}
