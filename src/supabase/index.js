import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export default function createSupabase() {
  const cookieStore = cookies()

  return createServerClient(
    `https://${process.env.SUPABASE_DOMAIN}`,
    process.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {}
        },
      },
    },
  )
}
