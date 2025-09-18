import { NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { LOCALE_VALUES, DEFAULT_LOCALE } from './lib/constants'

// Use locale configuration from constants
const locales = LOCALE_VALUES
const defaultLocale = DEFAULT_LOCALE

// Get the preferred locale, similar to the Next.js docs example
function getLocale(request) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  
  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  )
  
  return match(languages, locales, defaultLocale)
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname
  
  // Skip if it's an API route, _next files, or static assets
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.') // This catches static files like .ico, .png, etc.
  ) {
    return
  }

  // Check if there is any supported locale in the pathname (excluding default locale 'en')
  const nonDefaultLocales = locales.filter(locale => locale !== defaultLocale)
  const pathnameHasNonDefaultLocale = nonDefaultLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If pathname has a non-default locale, let it pass through
  if (pathnameHasNonDefaultLocale) {
    return
  }

  // If pathname starts with /en/, redirect to remove the /en prefix
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const newPathname = pathname === '/en' ? '/' : pathname.slice(3)
    const url = new URL(newPathname, request.url)
    // Preserve query parameters during redirect
    url.search = request.nextUrl.search
    return NextResponse.redirect(url)
  }

  // For all other paths (including root /), rewrite to /en internally
  // This serves English content without showing /en in the URL
  const url = new URL(`/en${pathname}`, request.url)
  // Preserve query parameters during rewrite
  url.search = request.nextUrl.search
  return NextResponse.rewrite(url)
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}

