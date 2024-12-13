import { getAllPeople } from '@/db/wiki'
import PeopleList from '../../components/wiki/PeopleList'

export const dynamic = 'force-dynamic'

export default async function WikiPage() {
  const people = await getAllPeople()

  return (
    <>
      <article className="flex h-10 items-center justify-center border-b">
        <p className="font-bold">우리가 기억하고 기록합니다.</p>
      </article>

      <PeopleList initialPeople={people} />
    </>
  )
}
