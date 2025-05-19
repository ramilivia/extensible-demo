import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '48em',
  lg: '64em',
  xl: '80em',
  '2xl': '96em'
})

// Create a function that returns the theme with dynamic colors from site config
export const createTheme = (siteConfiguration) => {
  const brandColor = '#c8102e'
  
  return extendTheme({
    breakpoints,
    sizes: {
      '7.5xl': '88rem',
    },
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
          INDIGO: (siteConfig) => ({
            bg: siteConfig?.primaryButtonBackground?.hex || 'indigo.600',
            color: siteConfig?.primaryButtonFontColor?.hex || 'white',
            _hover: {
              textDecoration: 'none',
              backgroundColor: siteConfig?.primaryButtonBackground?.hex || 'indigo.700'
            }
          }),
          WHITE: (siteConfig) => ({
            bg: 'white',
            color: siteConfig?.textColor?.hex || 'indigo.600',
            _hover: {
              textDecoration: 'none',
              backgroundColor: 'gray.50'
            }
          })
        }
      }
    },
    styles: {
      global: {
        'html, body': {
          color: siteConfiguration?.textColor?.hex
        },
        'ul, ol': {
          listStyle: 'none'
        }
      }
    }
  })
}

// Export a default theme for initial render
export const theme = createTheme()
