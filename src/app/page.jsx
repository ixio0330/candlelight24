import VMap from '@/components/VMap'
import { getAllStores } from '@/db'

export default async function MainPage() {
  const stores = await getAllStores()

  return (
    <>
      <VMap stores={stores} />

      <div className="fixed bottom-0 left-0 w-full">
        <section className="m-auto h-80 w-full max-w-screen-md rounded-t-3xl bg-white p-5">
          정보
        </section>
      </div>
    </>
  )
}
