import * as Blocks from '@/components/sections'

export default function Wrapper({ banner, blocks, hero, navigation, siteConfiguration, ...page }) {  

  return (
    <>
      {blocks.map((block) => {
        const Component = Blocks[block.component] || Blocks[block.__typename]

        if (!Component) return null

        return <Component key={block.id} page={page} siteConfiguration={siteConfiguration} {...block} />
      })}
    </>
  )
}
