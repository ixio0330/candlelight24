import createSupabase from '@/supabase'
import { getToday } from '@/utils/date'

export async function getAllStores() {
  try {
    const supabase = createSupabase()

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('store_id')
      .gte('end_date', getToday())

    if (ordersError) {
      console.log(ordersError)
      return null
    }

    const storeIds = orders?.map((order) => order.store_id) ?? []
    if (storeIds.length === 0) {
      return []
    }

    const { data: stores, error: storesError } = await supabase
      .from('stores')
      .select('id, name, latitude, longitude')
      .in('id', storeIds)

    if (storesError) {
      console.error('Error fetching stores:', storesError)
      return null
    }

    return stores ?? []
  } catch (error) {
    console.log(error)
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
                time,
                start_date,
                end_date,
                notes,
                created_at
            )
        `,
      )
      .in('id', storeIds)
      .filter('orders.end_date', 'gte', getToday())

    if (error) {
      console.log(error)
      return null
    }

    const storesWithGroupedOrders = data.map((store) => {
      const groupedOrders = store.orders.reduce((acc, order) => {
        const { recipient_name, time, start_date, end_date, notes, ...rest } =
          order

        if (!acc[recipient_name]) {
          acc[recipient_name] = {
            time,
            start_date,
            end_date,
            list: [],
          }
        }

        if (notes) {
          acc[recipient_name].notes = notes
        }

        acc[recipient_name].list.push(rest)
        return acc
      }, {})

      const { orders, ...storeWithoutOrders } = store
      return {
        ...storeWithoutOrders,
        orders: Object.entries(groupedOrders).map(
          ([recipient_name, { time, start_date, end_date, notes, list }]) => ({
            recipient_name,
            time,
            start_date,
            end_date,
            notes,
            list,
          }),
        ),
      }
    })

    return storesWithGroupedOrders ?? []
  } catch (error) {
    console.log(error)
    return null
  }
}
