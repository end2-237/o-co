import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

function getLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
    const match = preferred.find((p) => isLocale(p));
    if (match) return match;
  }
  return defaultLocale;
}

/** Redirect locale-less paths (e.g. /properties) to a localized one (/fr/...). */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, files with an extension, and root metadata routes.
  matcher: [
    "/((?!_next|icon|apple-icon|opengraph-image|twitter-image|brand-icon|.*\\..*).*)",
  ],
};
