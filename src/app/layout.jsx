import { GoogleAnalytics } from '@next/third-parties/google'
import { Noto_Sans_KR } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const notoSans = Noto_Sans_KR({
  subsets: ['cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  minimumScale: 1,
}

const metadataBase = new URL(`https://${process.env.NEXT_PUBLIC_DOMAIN}`)

export const metadata = {
  metadataBase,
  title: '촛불24',
  description: '집회를 위한 선결제 정보를 한번에 모아보세요.',
  author: '촛불24',
  openGraph: {
    url: metadataBase,
    title: '촛불24',
    site_name: '촛불24',
    description: '집회를 위한 선결제 정보를 한번에 모아보세요.',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '촛불24',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@seo__namu',
    creator: '@seo__namu',
    title: '촛불24',
    description: '집회를 위한 선결제 정보를 한번에 모아보세요.',
    images: [
      {
        url: '/opengraph-image.png',
        alt: '촛불24',
      },
    ],
  },
  additionalMetaTags: [
    { name: 'theme-color', content: '#ffffff' },
    { name: 'keywords', content: '촛불24, 집회, 선결제, 정보' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${notoSans.className} bg-whit h-screen overflow-hidden`}
      >
        {children}

        <Toaster />
      </body>

      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
    </html>
  )
}
