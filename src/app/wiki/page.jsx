import { getAllPeople } from '@/db/wiki'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

function getChipStyle(status) {
  switch (status) {
    case '불참':
      return 'bg-red-500 text-white'
    case '찬성':
      return 'bg-green-500 text-black'
    case '반대':
      return 'bg-red-500 text-stone-800'
    case '기권':
      return 'bg-yellow-400 text-white'
    default:
      return ''
  }
}

export default async function WikiPage() {
  const people = await getAllPeople()
  return (
    <>
      <article className="flex h-10 items-center justify-center border-b">
        <p className="font-bold">우리가 기억하고 기록합니다.</p>
      </article>
      <section>
        <ul className="grid h-[calc(100vh-93px)] grid-cols-2 gap-5 overflow-y-auto p-5">
          {people.map((person) => (
            <li
              key={`person-${person.id}`}
              className="space-y-3 rounded-xl border p-5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">{person?.name}</h2>
                  <Link
                    href={`/wiki/${person?.id}`}
                    className="rounded-full p-1 md:hover:bg-stone-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <p className="text-sm">
                  {person?.region} | {person?.count}
                </p>
              </div>

              <div>
                <ul>
                  {person?.votes?.map((vote) => (
                    <li
                      key={`vote-${vote.name}-${vote?.id}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <p>{vote?.name}</p>
                      <div
                        className={`${getChipStyle(vote?.status)} shrink-0 rounded p-1`}
                      >
                        {vote?.status}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
