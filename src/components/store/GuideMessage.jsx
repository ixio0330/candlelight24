'use client'

import { Clock3, Pencil, User } from 'lucide-react'

export default function GuideMessage() {
  return (
    <div className="space-y-2">
      <h2 className="font-bold">사용방법</h2>
      <ol className="list-decimal pl-5 text-sm">
        <li>지도에서 동그라미로 표시된 곳 선택</li>
        <li>집회를 위해 선결제된 매장과 메뉴 정보 확인</li>
      </ol>

      <h2 className="font-bold">예시</h2>
      <div className="space-y-1 rounded-lg border border-stone-300 bg-white p-2 text-sm">
        <p className="flex items-center gap-1">
          <User className="h-3.5 w-3.5 shrink-0" />
          {'[이름]'}으로 수령할 수 있어요.
        </p>
        <p className="flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5 shrink-0" />
          2024-12-OO, 시간
        </p>

        <p className="flex items-center gap-1">
          <Pencil className="h-3.5 w-3.5 shrink-0" />
          메모 내용
        </p>

        <div className="my-1 h-px bg-stone-200" />

        <div className="flex items-center gap-1">
          <p className="font-semibold">메뉴 이름</p>
          <p className="shrink-0 rounded-full bg-blue-500 px-3 py-1 text-xs text-white">
            총 10개
          </p>
          <p className="shrink-0 rounded-full bg-lime-500 px-3 py-1 text-xs text-white">
            1인 1개
          </p>
        </div>
      </div>
    </div>
  )
}
