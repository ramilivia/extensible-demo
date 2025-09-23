'use client'

import {
  VisuallyHidden,
  FormLabel,
  Select,
  Box
} from '@chakra-ui/react'
import { useRouter, usePathname } from 'next/navigation'
import { LOCALES } from '@/lib/constants'

export default function LanguageSelector({ siteConfiguration, currentLocale }) {
  const router = useRouter()
  const pathname = usePathname()
  const siteConfig = siteConfiguration

  // Use the passed currentLocale prop
  const activeLocale = LOCALES.find((locale) => locale.value === currentLocale) || LOCALES[0]

  const setLocale = (event) => {
    const newLocale = event.target.value
    
    // Get the base path without the current locale
    let pathWithoutLocale
    
    if (currentLocale === 'en') {
      // For English (no prefix), the pathname is already the base path
      pathWithoutLocale = pathname
    } else {
      // For other locales, remove the locale prefix
      pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
    }
    
    // Construct the new URL with the selected locale
    let newPath
    if (newLocale === 'en') {
      // For English, don't add a locale prefix
      newPath = pathWithoutLocale
    } else {
      // For other locales, add the locale prefix
      newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    }
    
    // Navigate to the new locale path
    router.push(newPath)
  }

  return (
    <Box as="form" mt={2} maxW={{ sm: 'xs' }}>
      <Box as="fieldset" w="full">
        <VisuallyHidden as={FormLabel} htmlFor="language">
          Language
        </VisuallyHidden>

        <Box position="relative">
          <Select
            id="language"
            name="language"
            color={siteConfig?.textColor?.hex || "gray.900"}
            bg={siteConfig?.backgroundColor?.hex || "white"}
            borderColor="gray.200"
            fontSize="md"
            value={activeLocale.value}
            onChange={setLocale}
            _hover={{ borderColor: "gray.300" }}
            sx={{
              '&:focus': {
                boxShadow: 'none !important',
                outline: 'none !important',
                borderColor: 'gray.300 !important'
              }
            }}
            borderRadius="md"
          >
            {LOCALES.map((locale) => (
              <Box
                as="option"
                bg={siteConfig?.backgroundColor?.hex || "white"}
                color={siteConfig?.textColor?.hex || "gray.900"}
                key={locale.value}
                value={locale.value}
              >
                {locale.label}
              </Box>
            ))}
          </Select>
        </Box>    
      </Box>
    </Box>
  )
}
