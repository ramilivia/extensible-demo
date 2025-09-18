import { HygraphInspector } from './inspector-sdk/react/index.esm.js'
import { useRouter } from 'next/router'

export function InspectorProvider({ children }) {
  const router = useRouter()

  // Only initialize inspector in development/preview mode
  if (process.env.NODE_ENV === 'production' && !router.isPreview) {
    return children
  }

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

  return (
    <HygraphInspector
      endpoint={endpoint}
      debug={process.env.NODE_ENV === 'development'}
      studioUrl={studioUrl}
      onSave={() => {
        // Use Next.js router reload to preserve scroll position
        router.reload()
      }}
    >
      {children}
    </HygraphInspector>
  )
}