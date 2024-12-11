import StoreView from '@/components/StoreView'
import { getAllStores } from '@/db'

export default async function MainPage() {
  const stores = await getAllStores()

  return <StoreView stores={stores} />
}
