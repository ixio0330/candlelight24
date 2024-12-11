import createSupabase from '@/supabase'

export async function getAllStores() {
  try {
    const supabase = createSupabase()
    const { data, error } = await supabase.from('stores').select('*')

    if (error) {
      return null
    }

    return data ?? []
  } catch (error) {
    return null
  }
}
