'use server'

import createSupabase from '@/supabase'
import { getToday } from '@/utils/date'

export async function getAllStores() {
  try {
    const supabase = createSupabase()

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('store_id')
      .gte('end_date', getToday())
      .eq('is_active', true)

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
                created_at,
                is_active
            )
        `,
      )
      .in('id', storeIds)
      .filter('orders.end_date', 'gte', getToday())
      .filter('orders.is_active', 'eq', true)

    if (error) {
      console.log(error)
      return null
    }

    const storesWithGroupedOrders = data.map((store) => {
      // 날짜별로 먼저 그룹화
      const ordersByDate = store.orders.reduce((acc, order) => {
        const dateKey = `${order.end_date}${order.time ? `-${order.time}` : ''}`
        if (!acc[dateKey]) {
          acc[dateKey] = []
        }
        acc[dateKey].push(order)
        return acc
      }, {})

      // 각 날짜 그룹 내에서 이름으로 묶기
      const processedOrders = Object.entries(ordersByDate).flatMap(
        ([dateKey, dateOrders]) => {
          // 수신자별로 그룹화
          const groupedByRecipient = dateOrders.reduce((acc, order) => {
            const { recipient_name, ...rest } = order
            if (!acc[recipient_name]) {
              acc[recipient_name] = []
            }
            acc[recipient_name].push(rest)
            return acc
          }, {})

          // 수신자별로 객체 생성
          return Object.entries(groupedByRecipient).map(
            ([recipient_name, orders]) => {
              const firstOrder = orders[0] // 수신자의 첫 번째 주문에서 공통 정보를 가져옴
              return {
                recipient_name,
                time: firstOrder.time,
                start_date: firstOrder.start_date,
                end_date: firstOrder.end_date,
                notes: firstOrder.notes,
                list: orders, // 해당 수신자의 모든 주문 포함
              }
            },
          )
        },
      )

      // 날짜순 정렬
      processedOrders.sort((a, b) => {
        if (a.end_date === b.end_date) {
          return (a.time || '') > (b.time || '') ? 1 : -1
        }
        return a.end_date > b.end_date ? 1 : -1
      })

      const { orders, ...storeWithoutOrders } = store
      return {
        ...storeWithoutOrders,
        orders: processedOrders,
      }
    })

    return storesWithGroupedOrders ?? []
  } catch (error) {
    console.log(error)
    return null
  }
}
