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
  const buttonStyles = {
    ...linkDefaultStyles,
    ...buttonSizes[size],
    bg: theme === 'INDIGO' ? 'indigo.600' : 'gray.100',
    color: theme === 'INDIGO' ? 'white' : 'gray.900',
    _hover: {
      bg: theme === 'INDIGO' ? 'indigo.700' : 'gray.200',
      textDecoration: 'none'
    }
  }

  if (href) {
    return (
      <Link href={href} passHref>
        <ChakraLink {...buttonStyles}>
          {label}
        </ChakraLink>
      </Link>
    )
  }

  return (
    <Box as="button" {...buttonStyles}>
      {label}
    </Box>
  )
}
