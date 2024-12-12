'use client'

import { useEffect, useRef, useState } from 'react'

export default function BottomSheet({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const sheetRef = useRef(null)
  const startY = useRef(0)
  const currentY = useRef(0)

  const handleDragStart = (e) => {
    setIsDragging(true)
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    startY.current = clientY
    currentY.current = clientY
  }

  const handleDragMove = (e) => {
    if (!isDragging) return

    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    currentY.current = clientY
    const deltaY = startY.current - currentY.current

    // 위로 스와이프/드래그 시 sheet 열기
    if (deltaY > 50 && !isOpen) {
      setIsOpen(true)
      setIsDragging(false)
    }
    // 아래로 스와이프/드래그 시 sheet 닫기
    else if (deltaY < -50 && isOpen) {
      setIsOpen(false)
      setIsDragging(false)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const sheet = sheetRef.current
    if (!sheet) return

    const addEventListeners = () => {
      // 모바일 이벤트
      sheet.addEventListener('touchstart', handleDragStart, { passive: true })
      sheet.addEventListener('touchmove', handleDragMove, { passive: true })
      sheet.addEventListener('touchend', handleDragEnd, { passive: true })

      // PC 이벤트
      sheet.addEventListener('mousedown', handleDragStart)
      sheet.addEventListener('mousemove', handleDragMove)
      sheet.addEventListener('mouseup', handleDragEnd)
    }

    const removeEventListeners = () => {
      // 모바일 이벤트 제거
      sheet.removeEventListener('touchstart', handleDragStart)
      sheet.removeEventListener('touchmove', handleDragMove)
      sheet.removeEventListener('touchend', handleDragEnd)

      // PC 이벤트 제거
      sheet.removeEventListener('mousedown', handleDragStart)
      sheet.removeEventListener('mousemove', handleDragMove)
      sheet.removeEventListener('mouseup', handleDragEnd)
    }

    addEventListeners()
    return removeEventListeners
  }, [isOpen])

  return (
    <div
      ref={sheetRef}
      className={`fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-2xl rounded-t-3xl bg-white shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? 'h-[60vh]' : 'h-[50vh]'} md:hidden`}
      style={{
        transform: isOpen ? 'translateY(0)' : 'translateY(60%)',
      }}
    >
      {/* 드래그 영역 */}
      <div
        className="absolute left-0 right-0 top-0 h-5 cursor-grab rounded-t-3xl bg-white"
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
      >
        <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-stone-300" />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="mt-5 h-[calc(100%-32px)] p-4">{children}</div>
    </div>
  )
}
