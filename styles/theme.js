import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '48em',
  lg: '64em',
  xl: '80em',
  '2xl': '96em'
})

export const theme = extendTheme({
  breakpoints,
  lineHeights: {
    tall: 1.8
  },
  colors: {
    orange: {
      600: '#EA580C'
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6b7280',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    indigo: {
      50: '#c8102e' ,
      100: '#c8102e' ,
      200: '#c8102e' ,
      300: '#c8102e' ,
      400: '#c8102e' ,
      500: '#c8102e' ,
      600: '#c8102e' ,
      700: '#c8102e' ,
      800: '#c8102e' ,
      900: '#c8102e' ,
    },
    green: {
      500: '#10B981'
    }
  },
  components: {
    Container: {
      baseStyle: {
        maxW: '65ch'
      }
    },
    Link: {
      variants: {
        INDIGO: {
          bg: 'indigo.600',
          color: 'white',
          _hover: {
            textDecoration: 'none',
            backgroundColor: 'indigo.700'
          }
        },
        WHITE: {
          bg: 'white',
          color: 'indigo.600',
          _hover: {
            textDecoration: 'none',
            backgroundColor: 'gray.50'
          }
        }
      }
    }
  },
  styles: {
    global: {
      'html, body': {
        color: 'gray.500'
      },
      'ul, ol': {
        listStyle: 'none'
      }
    }
  }
})
