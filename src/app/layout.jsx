import { GoogleAnalytics } from '@next/third-parties/google'
import { Noto_Sans_KR } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
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

export const metadata = {
  title: '촛불24',
  description: '집회를 위한 선결제 정보를 한번에 모아보세요.',
  author: '촛불24',
  openGraph: {
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${notoSans.className} h-screen overflow-hidden bg-white`}
      >
        <header className="fixed left-0 top-0 z-40 w-full bg-black text-white">
          <div className="m-auto flex h-14 max-w-screen-md items-center justify-between pl-2 pr-5">
            <h1 className="flex items-center gap-2 font-semibold">
              <Image src="/logo.png" alt="촛불24 로고" width={32} height={32} />
              촛불24
            </h1>

            <div className="flex items-center gap-2 text-sm">
              <Link href="https://forms.gle/Uh5TUVUbn8vyFDcj9" target="_blank">
                제보하기
              </Link>
              <Link
                href="https://buymeacoffee.com/candlelight24"
                target="_blank"
                className="rounded-lg bg-yellow-400 px-2 py-1.5 text-stone-700"
              >
                ☕️ 운영 후원
              </Link>
            </div>
          </div>
        </header>
        <main className="mt-14 bg-white">
          <div className="m-auto max-w-screen-md">{children}</div>
        </main>

        <Toaster />
      </body>

      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
    </html>
  )
}
