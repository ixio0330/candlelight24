import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-stone-50 p-5">
      <div className="flex flex-col gap-5 text-center">
        <h1 className="text-3xl font-bold md:text-5xl">404</h1>
        <p className="text-stone-600">요청하신 페이지를 찾을 수 없습니다.</p>
        <Link href="/" className="block bg-black py-2 text-stone-100">
          홈으로 가기
        </Link>
      </div>
    </main>
  )
}
