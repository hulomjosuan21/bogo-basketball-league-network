'use client'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function subscribeToNotifications(userId: string, onNotification: (payload: any) => void) {
    const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

    return supabase
        .channel('notifications')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${userId}`,
            },
            (payload) => {
                onNotification(payload)
            }
        )
        .subscribe()
}

