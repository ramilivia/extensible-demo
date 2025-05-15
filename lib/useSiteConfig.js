import { useState, useEffect } from 'react'
import { hygraphClient } from '@/lib/_client'
import { siteConfigurationQuery } from '@/lib/_queries'

const DEFAULT_VARIABLES = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME,
  // Add any other default variables that are always needed here
}

export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchConfig() {
      try {
        const client = hygraphClient()
        const { siteConfiguration } = await client.request(siteConfigurationQuery, DEFAULT_VARIABLES);
        setSiteConfig(siteConfiguration)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConfig()
  }, [])

  return { siteConfig, isLoading, error }
} 