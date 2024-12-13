import { getAllPeople } from '@/db/wiki'

export default async function WikiPage() {
  const people = await getAllPeople()
  return (
    <section>
      <ul>
        {people.map((person) => (
          <li key={`person-${person.id}`}>
            <h2>{person?.name}</h2>
            <p>{person?.region}</p>
            <p>{person?.count}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
