"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/** FR / EN toggle that swaps the locale segment of the current path. */
export function LanguageSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  const pathFor = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex items-center text-xs font-semibold tracking-wide", className)}
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span aria-hidden className="px-1.5 opacity-40">
              /
            </span>
          )}
          <Link
            href={pathFor(l)}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
            className={cn(
              "uppercase transition-opacity",
              l === locale ? "opacity-100" : "opacity-50 hover:opacity-100",
            )}
          >
            {localeLabels[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}
