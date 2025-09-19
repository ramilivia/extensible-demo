'use client'
import { useRef, useState, useEffect } from 'react'
import {
  Box,
  Flex,
  VisuallyHidden,
  Grid,
  Button,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { Transition } from 'react-transition-group'
import { MarkSVG } from '@/svgs'
import { XIcon } from '@/icons'

const defaultStyle = {
  transition: `all 150ms cubic-bezier(0.4, 0, 1, 1)`
}

const transitionStyles = {
  entering: { transform: 'scale(0.95)', opacity: 0, visibility: 'hidden' },
  entered: { transform: 'scale(1)', opacity: 1, visibility: 'visible', },
  exiting: { transform: 'scale(1)', opacity: 1, visibility: 'visible' },
  exited: { transform: 'scale(0.95)', opacity: 0, visibility: 'hidden' }
}

export default function MobileNavigation({ pages, siteConfiguration, isOpen, onClose }) {
  const siteConfig = siteConfiguration
  const container = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  
  // Get current locale from URL params
  const currentLocale = params?.locale || 'en'
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!container?.current?.contains(event.target)) {
        if (!isOpen) return
        onClose()
      }
    }

    window.addEventListener('click', handleOutsideClick)

    return () => window.removeEventListener('click', handleOutsideClick)
  }, [isOpen, onClose, container])

  useEffect(() => {
    const handleEscape = (event) => {
      if (!isOpen) return

      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keyup', handleEscape)

    return () => document.removeEventListener('keyup', handleEscape)
  }, [isOpen, onClose])


  return (
    <Transition in={isOpen} timeout={150}>
      {(state) => (
        <Box
          borderRadius="lg"
          boxShadow="lg"
          bg={siteConfig?.navBackground?.hex || 'white'}
          border="1px solid rgba(0, 0, 0, 0.05)"
          pos="absolute"
          top="100%"
          right="0"
          left="0"
          mt={2}
          zIndex="docked"
          transition="all 150ms cubic-bezier(0.4, 0, 0.2, 1)"
          transformOrigin="top right"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <Box pt={5} pb={6} px={5}>
            <Flex alignItems="center" justifyContent="space-between">
              <div>
                <Link href={currentLocale === 'en' ? '/' : `/${currentLocale}`}>
                  <VisuallyHidden>Hygraph</VisuallyHidden>
                  <Box as={MarkSVG} h={8} w="auto" color="indigo.600" />
                </Link>
              </div>
              <Box mr={-2}>
                <Button
                  type="button"
                  bg={siteConfig?.backgroundColor?.hex || 'white'}
                  borderRadius="md"
                  p={2}
                  display="inline-flex"
                  color={siteConfig?.navFontColor?.hex || 'gray.400'}
                  _hover={{
                    color: siteConfig?.navFontColor?.hex || 'gray.500',
                    bg: 'gray.100'
                  }}
                  onClick={onClose}
                >
                  <VisuallyHidden>Close menu</VisuallyHidden>
                  <Box as={XIcon} w={6} h={6} aria-hidden="true" />
                </Button>
              </Box>
            </Flex>
            <Box mt={6}>
              {pages && pages.length && (
                <Grid as="nav" gridRowGap={8}>
                  {pages.map((page) => {
                    const isActive = pathname.startsWith(`/${page.slug}`)

                    return (
                      <ChakraLink
                        key={page.id}
                        as={Link}
                        href={currentLocale === 'en' ? `/${page.slug}` : `/${currentLocale}/${page.slug}`}
                        m={-3}
                        p={3}
                        display="flex"
                        alignItems="center"
                        borderRadius="md"
                        color={isActive ? 'indigo.600' : 'inherit'}
                        _hover={{
                          bg: 'gray.50'
                        }}
                        _focus={{
                          outline: 'none',
                          boxShadow: 'none'
                        }}
                        onClick={onClose}
                      >
                        <Text
                          as="span"
                          ml={3}
                          fontSize="md"
                          fontWeight="medium"
                          color={siteConfig?.navFontColor?.hex || 'gray.900'}
                        >
                          {page.navigationLabel ||
                            page.slug.charAt(0).toUpperCase() +
                              page.slug.slice(1)}
                        </Text>
                      </ChakraLink>
                    )
                  })}
                </Grid>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Transition>
  )
}
