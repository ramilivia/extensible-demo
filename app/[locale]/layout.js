import '../../styles/css/global.css'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export default async function LocaleLayout({ children, params }) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || 'en'
  
  return (
    <html lang={locale}>
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
