'use client'

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  AspectRatio,
  Image,
  Text,
} from "@chakra-ui/react";
export default function GallerySection({ id, images, galleryTitle, description, siteConfiguration }) {
    const siteConfig = siteConfiguration
  const [index, setIndex] = useState(-1);

  if (images.length === 0) return null;

  const slides = images.map((image) => ({
    src: image.url,
    alt: image.alt,
    width: image.width,
    height: image.height,
  }));

  return (
    <Box as="section" bg={siteConfig?.backgroundColor?.hex || 'white'} py={[12, 12]}>
      <Container maxW="7.5xl" mx="auto">
        {galleryTitle && (
          <Heading 
            as="h2" 
            fontSize={{ base: '2.25rem', md: '2.75rem', lg: '3.5rem' }}
            px={{ base: 4, md: 8, lg: 0 }}
            marginLeft={{ base: 4, md: 0 }}
            marginBottom={1}
            fontWeight="bold"
            lineHeight="1.05"
            letterSpacing="-0.04em"
            fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
            color={siteConfig?.textColor?.hex} 
            mb={5}
            data-hygraph-entry-id={id}
            data-hygraph-field-api-id="title"
        >
          {galleryTitle}
        </Heading>
        )}
        <Box marginX={{ base: 0, md: 0, lg: 0 }}>
        <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color={siteConfig?.textColor?.hex}
            maxW="2xl"
            whiteSpace="pre-wrap"
            marginBottom={5}
            data-hygraph-entry-id={id}
            data-hygraph-field-api-id="description"
            py={2}
            >
              {description}
            </Text>

        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          {/* First image spanning two columns */}
          <Box
            gridColumn={{ base: "span 2", md: "span 2" }}
            gridRow={{ base: "span 2", md: "span 2" }}
            position="relative"
            cursor="pointer"
            _hover={{ opacity: 0.9 }}
            transition="opacity 0.2s"
            onClick={() => setIndex(0)}
            overflow="hidden"
            borderRadius="lg"
          >
            <AspectRatio ratio={1}>
              <Image
                src={images[0].url}
                alt={images[0].alt || "Gallery image 1"}
                width={images[0].width}
                height={images[0].height}
                data-hygraph-entry-id={id}
                data-hygraph-field-api-id="images"
                objectFit="cover"
                _hover={{ transform: "scale(1.05)" }}
                transition="transform 0.4s ease-in-out"
                loading="eager"
                decoding="async"
                sx={{
                  WebkitFontSmoothing: "antialiased",
                  backfaceVisibility: "hidden",
                  imageRendering: "auto",
                  filter: "blur(0.5px)",
                  transform: "translateZ(0)",
                }}
              />
            </AspectRatio>
          </Box>

          {/* Rest of the images */}
          {images.slice(1).map((image, idx) => (
            <Box
              key={idx + 1}
              position="relative"
              cursor="pointer"
              _hover={{ opacity: 0.9 }}
              transition="opacity 0.2s"
              onClick={() => setIndex(idx + 1)}
              overflow="hidden"
              borderRadius="lg"
            >
              <AspectRatio ratio={1}>
                <Image
                  src={image.url}
                  alt={image.alt || `Gallery image ${idx + 2}`}
                  width={image.width}
                  height={image.height}
                  objectFit="cover"
                  _hover={{ transform: "scale(1.1)" }}
                  transition="transform 0.4s ease-in-out"
                  loading="lazy"
                  decoding="async"
                  data-hygraph-entry-id={id}
                  data-hygraph-field-api-id="images"
                  sx={{
                    WebkitFontSmoothing: "antialiased",
                    backfaceVisibility: "hidden",
                    imageRendering: "auto",
                    filter: "blur(0.5px)",
                    transform: "translateZ(0)",
                  }}
                />
              </AspectRatio>
            </Box>
          ))}
        </SimpleGrid>
          </Box>
        <Lightbox
          slides={slides}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          carousel={{
            preload: 3,
            imageFit: "contain"
          }}
        />
      </Container>
    </Box>
  );
}
