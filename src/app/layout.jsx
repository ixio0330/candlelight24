import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans_KR({
  subsets: ['cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: '촛불24',
  description: '집회를 위한 선결제 정보를 한번에 모아보세요!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={notoSans.className}>{children}</body>
    </html>
  )
}
