import { Box, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'

const linkDefaultStyles = {
  width: 'full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: [4, null, 10],
  py: [0, null, 4],
  fontSize: ['base', null, 'lg'],
  fontWeight: 'medium',
  borderRadius: 'md'
}

const buttonSizes = {
  SMALL: {
    px: [2, null, 4],
    py: [1, null, 2],
    fontSize: ['sm', null, 'base']
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
export default function Button({ href, label, theme, size = 'MEDIUM' }) {
  if (!href || !label) return null

  if (href.includes('http')) {
    return (
      <Box borderRadius="md" boxShadow="md">
        <ChakraLink
          isExternal
          href={href}
          {...linkDefaultStyles}
          {...buttonSizes[size]}
          variant={theme}
        >
          {label}
        </ChakraLink>
      </Box>
    )
  }

  return (
    <Box borderRadius="md" boxShadow="md">
      <Link href={href} passHref>
        <ChakraLink {...linkDefaultStyles} {...buttonSizes[size]} variant={theme}>
          {label}
        </ChakraLink>
      </Link>
    </Box>
  )
}
