import { useState, useEffect } from 'react'
import { hygraphClient } from '@/lib/_client'
import { siteConfigurationQuery } from '@/lib/_queries'

export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchConfig() {
      try {
        const client = hygraphClient()
        const { siteConfiguration } = await client.request(siteConfigurationQuery)
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