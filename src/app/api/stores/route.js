import { getStoresByIds } from '@/db'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const storeIds = searchParams
    .get('ids')
    ?.split(',')
    ?.map((id) => Number(id))

  if (!storeIds) {
    return Response.json(null)
  }

  const stores = await getStoresByIds(storeIds)

  return Response.json(stores)
}
