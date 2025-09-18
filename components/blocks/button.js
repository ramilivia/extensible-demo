import { Box, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

const linkDefaultStyles = {
  width: 'full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: [4, null, 10],
  py: [0, null, 4],
  fontSize: ['base', null, 'lg'],
  fontWeight: 'medium',
  borderRadius: 'md',
  textDecoration: 'none',
  _hover: {
    textDecoration: 'none'
  },
  _focus: {
    textDecoration: 'none'
  }
}

const buttonSizes = {
  SMALL: {
    px: [2, null, 4],
    py: [1, null, 2],
    fontSize: ['sm', 'xs', 'xs']
  },
  MEDIUM: {
    px: [4, null, 8],
    py: [2, null, 3],
    fontSize: ['base', null, 'lg']
  },
  LARGE: {
    px: [6, null, 10],
    py: [3, null, 4],
    fontSize: ['lg', null, 'xl']
  }
}

const themeStyles = {
  PRIMARY: (siteConfig) => ({
    bg: siteConfig?.primaryButtonBackground?.hex,
    color: siteConfig?.primaryButtonFontColor?.hex
  }),
  PRIMARY_INVERTED: (siteConfig) => ({
    bg: siteConfig?.primaryButtonFontColor?.hex,
    color: siteConfig?.primaryButtonBackground?.hex,
    border: '2px solid',
    borderColor: siteConfig?.primaryButtonBackground?.hex
  }),
  SECONDARY: (siteConfig) => ({
    bg: siteConfig?.secondaryButtonBackground?.hex,
    color: siteConfig?.secondaryButtonFontColor?.hex
  }),
  SECONDARY_INVERTED: (siteConfig) => ({
    bg: siteConfig?.secondaryButtonFontColor?.hex,
    color: siteConfig?.secondaryButtonBackground?.hex,
    border: '2px solid',
    borderColor: siteConfig?.secondaryButtonBackground?.hex
  })
}

export default function Button({ href, label, size = 'MEDIUM', theme = 'PRIMARY' }) {
  const siteConfig = useSiteConfiguration()
  const buttonStyles = {
    ...linkDefaultStyles,
    ...buttonSizes[size],
    ...themeStyles[theme](siteConfig)
  }

  if (href) {
    return (
      <ChakraLink as={Link} href={href} {...buttonStyles}>
        {label}
      </ChakraLink>
    )
  }

  return (
    <Box as="button" {...buttonStyles}>
      {label}
    </Box>
  )
}
