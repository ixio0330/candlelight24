export default function OverlayLoader({ children, loading }) {
  if (!loading) return null

  return (
    <article className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-50">
      <div className="flex items-center gap-2 rounded-xl bg-white px-8 py-5 text-sm text-stone-500 lg:px-10 lg:py-6 lg:text-base">
        {children}
        <div className="animate-rotation box-border inline-block h-5 w-5 rounded-full border-2 border-stone-400 border-b-transparent" />
      </div>
    </article>
  )
}
