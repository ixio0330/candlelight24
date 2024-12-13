import { getPersonDetailById } from '@/db/wiki'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProfileWikiPage({ params }) {
  if (!params?.id) {
    return null
  }

  const personDetail = await getPersonDetailById(params.id)

  return (
    <>
      <section>
        <div className="flex h-14 items-center justify-between px-3 pr-5">
          <Link href="/wiki">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h2 className="font-bold">{personDetail?.name}</h2>
          <span></span>
        </div>

        <div className="px-5 text-sm">
          <table className="w-full border-collapse border">
            <tbody>
              <tr className="border-b">
                <th className="w-24 border-r py-3 pl-3 text-left font-medium text-stone-500">
                  정당
                </th>
                <td className="py-3 pl-3">
                  {personDetail?.party_id === 1 && '국민의힘'}
                </td>
              </tr>
              <tr className="border-b">
                <th className="w-24 border-r py-3 pl-3 text-left font-medium text-stone-500">
                  지역
                </th>
                <td className="py-3 pl-3">{personDetail?.region}</td>
              </tr>
              <tr className="border-b">
                <th className="w-24 border-r py-3 pl-3 text-left font-medium text-stone-500">
                  소속위원회
                </th>
                <td className="py-3 pl-3">{personDetail?.committee}</td>
              </tr>
              <tr className="border-b">
                <th className="w-24 border-r py-3 pl-3 text-left font-medium text-stone-500">
                  당선횟수
                </th>
                <td className="py-3 pl-3">{personDetail?.count}선</td>
              </tr>
              <tr className="border-b">
                <th className="w-24 border-r py-3 pl-3 text-left font-medium text-stone-500">
                  당선방법
                </th>
                <td className="py-3 pl-3">{personDetail?.process}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* <section className="px-5 pt-8">
        <h2 className="text-lg font-semibold">위키</h2>

        {personDetail?.wiki}
      </section> */}
    </>
  )
}
