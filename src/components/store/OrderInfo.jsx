'use client'

import { Clock3, Pencil, User } from 'lucide-react'

export default function OrderInfo({
  recipient_name,
  list,
  start_date,
  end_date,
  time,
  notes,
}) {
  return (
    <div className="rounded-lg border border-stone-300 bg-white p-2">
      <div className="flex flex-col gap-1 text-sm">
        {recipient_name !== 'null' && recipient_name && (
          <h4 className="flex items-center gap-1">
            <User className="h-3.5 w-3.5 shrink-0" />
            {recipient_name}
          </h4>
        )}
        <p className="flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5 shrink-0" />
          {start_date && `${start_date}일 ~ `}
          {end_date}일{time && `, ${time}`}
        </p>

        {notes && (
          <div className="flex space-x-1">
            <Pencil className="flex-start mt-1 h-3.5 w-3.5 shrink-0" />
            <div className="space-y-1">
              {notes?.split('\n').map((note, idx) => (
                <p key={note + idx} className="">
                  {note}
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="my-1 h-px bg-stone-200" />
      </div>
      <ul className="space-y-1">
        {list?.map(({ id, name, quantity, max_per_person }) => (
          <li key={`order-${name}-${id}`} className="flex items-center gap-1">
            <p className="text-sm font-semibold">{name}</p>
            <p className="shrink-0 rounded-full bg-blue-500 px-3 py-1 text-xs text-white">
              총 {quantity}개
            </p>
            {0 < max_per_person && (
              <p className="shrink-0 rounded-full bg-lime-500 px-3 py-1 text-xs text-white">
                1인{' '}
                {max_per_person > 1 ? `최대 ${max_per_person}` : max_per_person}
                개
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
