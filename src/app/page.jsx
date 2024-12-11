import VMap from '@/components/VMap'
import Script from 'next/script'

export default function MainPage() {
  return (
    <>
      <Script
        src={`https://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=${process.env.NEXT_PUBLIC_VWORD_API_KEY}`}
        strategy="beforeInteractive"
      />
      <VMap />
    </>
  )
}
