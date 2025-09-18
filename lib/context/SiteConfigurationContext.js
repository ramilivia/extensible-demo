'use client'

import { createContext, useContext } from 'react'

const SiteConfigurationContext = createContext(null)

export function SiteConfigurationProvider({ children, siteConfiguration }) {
  return (
    <SiteConfigurationContext.Provider value={siteConfiguration}>
      {children}
    </SiteConfigurationContext.Provider>
  )
}

export function useSiteConfiguration() {
  const context = useContext(SiteConfigurationContext)
  if (context === undefined) {
    throw new Error('useSiteConfiguration must be used within a SiteConfigurationProvider')
  }
  return context
} 