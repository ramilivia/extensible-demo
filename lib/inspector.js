'use client'
import { Suspense } from 'react'
import { HygraphInspector } from './inspector-sdk/react/index.esm.js'
import { useRouter, useSearchParams } from 'next/navigation'

function InspectorProviderClient({ children }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Only initialize inspector in development mode
  // Note: Preview mode detection would need to be handled differently in App Router
  if (!searchParams.has('inspector')) { // || process.env.NODE_ENV === 'production'
    console.log('[Inspector] Not initializing inspector in production or not in inspector mode')
    return children
  }

  console.log('[Inspector] Initializing inspector in development mode')
  const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT
  const studioUrl = process.env.NEXT_PUBLIC_HYGRAPH_STUDIO_URL
  if (!endpoint) {
    console.warn('[Inspector] Missing NEXT_PUBLIC_HYGRAPH_ENDPOINT')
    return children
  }
  if (!studioUrl) {
    console.warn('[Inspector] Missing NEXT_PUBLIC_HYGRAPH_STUDIO_URL')
    return children
  }

  console.log('Rendering Inspector with endpoint and studioUrl', endpoint, studioUrl)

  return (
    <HygraphInspector
      endpoint={endpoint}
      debug={process.env.NODE_ENV === 'development'}
      studioUrl={studioUrl}
      onSave={() => {
        // Use Next.js App Router refresh to reload the page
        router.refresh()
      }}
    >
      {children}
    </HygraphInspector>
  )
}

export function InspectorProvider({ children }) {
  return (
    <Suspense fallback={children}>
      <InspectorProviderClient>{children}</InspectorProviderClient>
    </Suspense>
  )
}