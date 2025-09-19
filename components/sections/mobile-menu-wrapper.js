'use client'
import { useState } from 'react'
import { Box, Button, VisuallyHidden } from '@chakra-ui/react'
import { MenuIcon } from '@/icons'
import MobileNavigation from './mobile-navigation'

export default function MobileMenuToggle({ pages, siteConfiguration }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  
  const handleOpen = () => setMobileNavOpen(true)
  const handleClose = () => setMobileNavOpen(false)

  return (
    <>
      <MobileNavigation 
        pages={pages} 
        siteConfiguration={siteConfiguration}
        isOpen={mobileNavOpen}
        onClose={handleClose}
      />
      <Box display={{ md: 'none' }}>
        <Button
          type="button"
          bg={siteConfiguration?.backgroundColor?.hex || 'white'}
          borderRadius="md"
          p={2}
          display="inline-flex"
          color={siteConfiguration?.navFontColor?.hex || 'gray.400'}
          _hover={{
            color: siteConfiguration?.navFontColor?.hex || 'gray.500',
            bg: 'gray.100'
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleOpen()
          }}
        >
          <VisuallyHidden>Open menu</VisuallyHidden>
          <Box as={MenuIcon} w={6} h={6} aria-hidden="true" />
        </Button>
      </Box>
    </>
  )
}
