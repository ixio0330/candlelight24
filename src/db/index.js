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
                created_at
            )
        `,
      )
      .in('id', storeIds)

    if (error) {
      console.log(error)
      return null
    }

    return data ?? []
  } catch (error) {
    return null
  }
}
