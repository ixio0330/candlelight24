import createSupabase from '@/supabase'
import { getToday } from '@/utils/date'

export async function getAllStores() {
  try {
    const supabase = createSupabase()

    const { data, error } = await supabase
      .from('stores')
      .select('id, date, name, latitude, longitude')
      .gt('date', getToday())
      .order('date', { ascending: false })

    if (error) {
      console.log(error)
      return null
    }

    return data ?? []
  } catch (error) {
    return null
  }
}

export async function getStoresByIds(storeIds = []) {
  try {
    const supabase = createSupabase()
    const { data, error } = await supabase
      .from('stores')
      .select(
        `
            *,
            orders (
                id,
                name,
                quantity,
                max_per_person,
                recipient_name,
                created_at
            )
        `,
      )
      .in('id', storeIds)

    if (error) {
      console.log(error)
      return null
    }

    const storesWithGroupedOrders = data.map((store) => {
      const groupedOrders = store.orders.reduce((acc, order) => {
        const recipient = order.recipient_name
        if (!acc[recipient]) {
          acc[recipient] = []
        }
        acc[recipient].push(order)
        return acc
      }, {})

      const { orders, ...storeWithoutOrders } = store
      return {
        ...storeWithoutOrders,
        orders: Object.entries(groupedOrders).map(([recipient_name, list]) => ({
          recipient_name,
          list,
        })),
      }
    })

    return storesWithGroupedOrders ?? []
  } catch (error) {
    return null
  }
}
