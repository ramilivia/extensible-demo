import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '48em',
  lg: '64em',
  xl: '80em',
  '2xl': '96em'
})

// Function to generate color shades
const generateColorShades = (baseColor) => {
  // For now, we'll use the same color for all shades since we only have one color from CMS
  // In a real implementation, you might want to generate different shades
  return {
    50: baseColor,
    100: baseColor,
    200: baseColor,
    300: baseColor,
    400: baseColor,
    500: baseColor,
    600: baseColor,
    700: baseColor,
    800: baseColor,
    900: baseColor,
  }
}

// Create a function that returns the theme with dynamic colors
export const createTheme = (siteConfig) => {
  const brandColor = siteConfig?.mainBrandColor?.hex || '#c8102e'
  
  return extendTheme({
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
      indigo: generateColorShades(brandColor),
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
}

// Export a default theme for initial render
export const theme = createTheme({ mainBrandColor: { hex: '#c8102e' } })
