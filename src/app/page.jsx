import StoreView from '@/components/store/StoreView'
import { getAllStores } from '@/db/store'
import Image from 'next/image'
import Link from 'next/link'

export default async function MainPage() {
  const stores = await getAllStores()

  return (
    <>
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
        <div className="m-auto max-w-screen-md">
          <StoreView stores={stores} />
        </div>
      </main>
    </>
  )
}
