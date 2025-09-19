import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Stack,
} from '@chakra-ui/react' 
import Link from 'next/link'
import { LAYOUT_CONSTANTS } from '@/lib/constants'
import MobileMenuToggle from '../blocks/mobile-menu-toggle'

export default function Navigation({ pages, siteConfiguration, currentPathname, currentLocale = 'en' }) {
  const siteConfig = siteConfiguration


  return (
    <Box pos="relative" bg={siteConfig?.navBackground?.hex} color={siteConfig?.navFontColor?.hex} boxShadow="base" h={{ base: 'auto', md: LAYOUT_CONSTANTS.navigationHeight }} zIndex="sticky">
      <Box maxW="7.5xl" mx="auto" px={[4, 6]} height={{ base: 'auto', md: '100%' }} display="flex" alignItems="center">
        <Stack
          display="flex"
          w="100%"
          justifyContent={['space-between']}
          alignItems="center"
          py={6}
          direction="row"
          spacing={{ md: 10 }}
        >
          <Flex w={{ lg: 0 }} flex={{ lg: '1 1 0' }} alignItems="center" justifyContent="space-between">
            <Link href={currentLocale === 'en' ? '/' : `/${currentLocale}`}>
              {siteConfig?.logo && <img src={siteConfig?.logo?.url} alt="Logo" style={{maxHeight: '100px', maxWidth: siteConfig?.maxLogoWidthPx || '241px'}}/>}
            </Link>
            <Box />
          </Flex>
          <MobileMenuToggle pages={pages} siteConfiguration={siteConfig} />
          {pages && pages.length && (
            <Stack
              as="nav"
              display={['none', null, 'flex']}
              direction="row"
              spacing={10}
            >
              {pages.map((page) => {
                const isActive = currentPathname?.startsWith(`/${page.slug}`)

                return (
                  <ChakraLink
                    key={page.id}
                    as={Link}
                    href={currentLocale === 'en' ? `/${page.slug}` : `/${currentLocale}/${page.slug}`}
                    fontSize="sm"
                    fontWeight="medium"
                    color={isActive ?  siteConfig?.navFontColor?.hex || 'indigo.600' : siteConfig?.navFontColor?.hex || 'gray.500'}
                    _hover={{
                      color: 'gray.900'
                    }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none'
                    }}
                  >
                    {page.navigationLabel ||
                      page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}
                  </ChakraLink>
                )
              })}
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
