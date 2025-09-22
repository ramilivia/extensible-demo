// Layout constants extracted from theme for server components
export const LAYOUT_CONSTANTS = {
  navigationHeight: '4.5rem',
  bannerHeight: '2.8rem',
}

// Container sizes
export const CONTAINER_SIZES = {
  '7.5xl': '88rem',
}

// Typography sizes
export const FONT_SIZES = {
  TITLE_LARGE: { base: '3.25rem', md: '3.75rem', lg: '4.8rem', '2xl': '4.8rem' },
  TITLE_MEDIUM: { base: '3.25rem', md: '3.75rem', lg: '4rem', '2xl': '4.3rem' },
}

// Breakpoints
export const BREAKPOINTS = {
  base: '0em',
  sm: '40em', 
  md: '48em',
  lg: '64em',
  xl: '80em',
  '2xl': '96em'
}

// Locale configuration
export const LOCALES = [
  { value: 'en', label: 'English', default: true },
  { value: 'de', label: 'German' },
  { value: 'fr', label: 'French' }
]

export const LOCALE_VALUES = LOCALES.map(locale => locale.value)
export const DEFAULT_LOCALE = LOCALES.find(locale => locale.default)?.value || 'en'
