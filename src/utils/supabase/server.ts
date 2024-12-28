import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if(!supabaseUrl && !supabaseAnonKey){
    throw new Error('Supabase missing env variables!')
}

export async function getBarangay(){
    const cookieStore = await cookies()

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                    }
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: barangayData } = await supabase
        .from("adminData")
        .select()
        .eq('userId', user?.id)
        .single();

    return { user, barangayData};
}

export async function getUser(){
    const cookieStore = await cookies()

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                    }
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: userData } = await supabase
        .from("usersData")
        .select()
        .eq('userId', user?.id)
        .single();

    return { user, userData, isSignedIn: !!user };
}

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                    }
                },
            },
        }
    )
}