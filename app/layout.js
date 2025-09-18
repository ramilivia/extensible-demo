import '../styles/css/global.css'

export const metadata = {
  title: 'Extensible Demo',
  description: 'Next.js 14 with Hygraph CMS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@tailwindcss/typography@0.2.x/dist/typography.min.css"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}