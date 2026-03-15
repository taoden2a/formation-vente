"use client";

/**
 * BACK NAV — navigation de retour universelle
 *
 * Affiche :
 * - Mobile  : ← Retour (window.history.back())
 * - Desktop : ← Retour · [breadcrumb items cliquables]
 *
 * Usage :
 *   <BackNav items={[
 *     { label: "Formation", href: "/formation" },
 *     { label: moduleTitle },
 *   ]} />
 */

import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BackNavProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function BackNav({ items = [], className = "" }: BackNavProps) {
  return (
    <div className={`flex items-center gap-3 text-xs text-gray-500 mb-8 ${className}`}>
      {/* ← Retour — always visible */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-1.5 hover:text-white transition-all duration-200 hover:-translate-x-0.5 flex-shrink-0 group"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Retour
      </button>

      {/* Breadcrumb — hidden on mobile, visible sm+ */}
      {items.length > 0 && (
        <div className="hidden sm:flex items-center gap-1.5 min-w-0">
          <span className="text-gray-700 select-none flex-shrink-0">·</span>
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 text-gray-700"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors flex-shrink-0 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600 truncate max-w-[180px]">
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
