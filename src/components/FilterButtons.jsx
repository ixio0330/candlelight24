'use client'

export default function FilterButtons({ showTodayOnly, setShowTodayOnly }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setShowTodayOnly(false)}
        className={`rounded-full px-3 py-1 text-sm ${
          !showTodayOnly
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        전체
      </button>
      <button
        onClick={() => setShowTodayOnly(true)}
        className={`rounded-full px-3 py-1 text-sm ${
          showTodayOnly
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        오늘
      </button>
    </div>
  )
}
