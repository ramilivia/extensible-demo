import * as Blocks from '@/components/sections'

export default function SectionMapper({ id, banner, blocks, hero, navigation, siteConfiguration, ...page }) {  

  return (
    <div data-hygraph-entry-id={id}>
      {hero && (
        <div data-hygraph-field-api-id="hero">
          {(() => {
            const Component = Blocks[hero.component] || Blocks[hero.__typename] || Blocks.Hero
            if (!Component) return null
            return <Component key={hero.id} page={page} siteConfig={siteConfiguration} {...hero} />
          })()}
        </div>
      )}

      {blocks && (
        <div data-hygraph-field-api-id="blocks">
          {blocks.map((block) => {
            const Component = Blocks[block.component] || Blocks[block.__typename]

            if (!Component) return null

            return (
              <div key={block.id} data-hygraph-entry-id={block.id}>
                <Component page={page} siteConfiguration={siteConfiguration} {...block} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
