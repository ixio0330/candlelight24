'use client'

import { ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

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

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default function PeopleList({ initialPeople }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPeople, setFilteredPeople] = useState(initialPeople || [])

  const updateSearch = useCallback(
    debounce((value) => {
      if (!initialPeople) return

      const search = value.toLowerCase()
      const filtered = initialPeople.filter(
        (person) =>
          person.name.toLowerCase().includes(search) ||
          person.region.toLowerCase().includes(search),
      )
      setFilteredPeople(filtered)
    }, 300),
    [initialPeople],
  )

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    updateSearch(value)
  }

  if (!initialPeople) {
    return (
      <div className="flex h-[calc(100vh-40px)] items-center justify-center">
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    )
  }

  return (
    <div className="">
      <div className="flex h-16 items-center justify-center px-5">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="이름 또는 지역으로 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-lg border p-2 pl-9 text-sm focus:outline-black"
          />
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <ul className="grid h-[calc(100vh-147px)] auto-rows-min grid-cols-1 gap-5 overflow-y-auto px-5 pb-8 md:grid-cols-2">
        {filteredPeople.map((person) => (
          <li
            key={`person-${person.id}`}
            className="flex h-[140px] flex-col justify-between rounded-xl border p-5"
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
              <ul className="space-y-1">
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
    </div>
  )
}
