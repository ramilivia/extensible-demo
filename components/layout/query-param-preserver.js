'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function QueryParamPreserver() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Handle inspector parameter preservation logic directly
  if (typeof window !== 'undefined') {
    // If inspector is in the current URL, remember it
    if (searchParams.has('inspector')) {
      sessionStorage.setItem('preserveInspector', 'true')
    }
    
    // Clean up if inspector is explicitly disabled
    if (searchParams.get('inspector') === 'false') {
      sessionStorage.removeItem('preserveInspector')
    }

    const shouldPreserve = sessionStorage.getItem('preserveInspector') === 'true'
    const hasInspector = searchParams.has('inspector')

    // Only add inspector if it should be preserved and is missing
    if (shouldPreserve && !hasInspector) {
      const url = new URL(window.location)
      url.searchParams.set('inspector', 'true')
      
      // Use history.replaceState to avoid flickering
      window.history.replaceState(null, '', url.toString())
    }
  }

  return null
}

