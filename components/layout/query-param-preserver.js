'use client'
import { useEffect } from 'react'

// Simple utility to preserve inspector query parameter across navigation
function preserveInspectorParam() {
  if (typeof window === 'undefined') return

  const url = new URL(window.location)
  const searchParams = url.searchParams

  // If inspector is in the current URL, remember it
  if (searchParams.has('inspector')) {
    sessionStorage.setItem('preserveInspector', 'true')
    // Store the current URL to detect manual changes
    sessionStorage.setItem('lastInspectorUrl', window.location.href)
  }
  
  // Clean up if inspector is explicitly disabled
  if (searchParams.get('inspector') === 'false') {
    sessionStorage.removeItem('preserveInspector')
    sessionStorage.removeItem('lastInspectorUrl')
    return
  }

  const shouldPreserve = sessionStorage.getItem('preserveInspector') === 'true'
  const hasInspector = searchParams.has('inspector')
  const lastInspectorUrl = sessionStorage.getItem('lastInspectorUrl')

  // Only add inspector if it should be preserved and is missing
  if (shouldPreserve && !hasInspector) {
    // Check if the URL was manually edited by comparing with the last known URL
    // If the current URL (without inspector) plus inspector param equals the last URL,
    // then inspector was likely removed programmatically during navigation
    const urlWithInspector = new URL(window.location)
    urlWithInspector.searchParams.set('inspector', 'true')
    
    // If this is a completely different page/path, preserve inspector
    // If this is the same page but inspector was manually removed, don't preserve
    if (lastInspectorUrl) {
      const lastUrl = new URL(lastInspectorUrl)
      const currentPath = url.pathname + url.search.replace(/[?&]inspector=[^&]*/g, '').replace(/^&/, '?').replace(/^\?$/, '')
      const lastPath = lastUrl.pathname + lastUrl.search.replace(/[?&]inspector=[^&]*/g, '').replace(/^&/, '?').replace(/^\?$/, '')
      
      // If we're on the same page and inspector was removed, user likely removed it manually
      if (currentPath === lastPath) {
        sessionStorage.removeItem('preserveInspector')
        sessionStorage.removeItem('lastInspectorUrl')
        return
      }
    }
    
    url.searchParams.set('inspector', 'true')
    sessionStorage.setItem('lastInspectorUrl', url.toString())
    
    // Use history.replaceState to avoid flickering
    window.history.replaceState(null, '', url.toString())
  }
}

// Initialize the inspector parameter preservation
function initializeInspectorPreservation() {
  if (typeof window === 'undefined') return
  
  // Don't initialize multiple times
  if (window.__inspectorPreservationInitialized) return
  window.__inspectorPreservationInitialized = true

  // Run immediately
  preserveInspectorParam()
  
  // Also run on navigation changes
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState
  
  history.pushState = function(...args) {
    originalPushState.apply(history, args)
    setTimeout(preserveInspectorParam, 0)
  }
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args)
    setTimeout(preserveInspectorParam, 0)
  }
  
  // Listen for popstate (back/forward navigation)
  window.addEventListener('popstate', preserveInspectorParam)
}

export default function QueryParamPreserver() {
  useEffect(() => {
    initializeInspectorPreservation()
  }, [])

  return null
}

