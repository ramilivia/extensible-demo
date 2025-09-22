'use client'
import { useEffect, useRef, Suspense } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

function QueryParamPreserverClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasInspectorInitially = useRef(null)

  useEffect(() => {
    // On first load, check if inspector was present in the initial URL
    if (hasInspectorInitially.current === null) {
      const urlParams = new URLSearchParams(window.location.search)
      hasInspectorInitially.current = urlParams.has('inspector')
      
      if (hasInspectorInitially.current) {
        // Store the inspector parameter in sessionStorage for persistence across navigation
        sessionStorage.setItem('inspector', 'true')
      }
      return
    }

    // For subsequent navigation, only restore if it was initially present
    if (hasInspectorInitially.current) {
      const hasInspector = searchParams.has('inspector')
      
      if (!hasInspector) {
        // Add inspector parameter to current URL
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('inspector', 'true')
        const newUrl = `${pathname}?${newSearchParams.toString()}`
        
        // Replace current URL with inspector parameter
        router.replace(newUrl)
      }
    }
  }, [pathname, searchParams, router])

  // Clean up sessionStorage when inspector parameter is explicitly set to false
  useEffect(() => {
    const inspectorValue = searchParams.get('inspector')
    if (inspectorValue === 'false') {
      sessionStorage.removeItem('inspector')
      hasInspectorInitially.current = false
    }
  }, [searchParams])

  return null
}

export default function QueryParamPreserver() {
  return (
    <Suspense fallback={null}>
      <QueryParamPreserverClient />
    </Suspense>
  )
}
