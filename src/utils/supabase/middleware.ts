import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import RoleTypes from "@/types/roleTypes";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if(!supabaseUrl && !supabaseAnonKey){
    throw new Error('Supabase missing env variables!')
}

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value}) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        supabase
            .channel('notifications')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    console.log('Notification change received:', payload)
                }
            )
            .subscribe()
    }

    const { pathname } = request.nextUrl;

    if (!user && pathname !== '/' && !pathname.startsWith('/auth') && !pathname.startsWith('/view')) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const { data: barangayData } = user
        ? await supabase
            .from("adminData")
            .select()
            .eq('userId', user.id)
            .single()
        : { data: null };

    const { data: userData } = user
        ? await supabase
            .from("usersData")
            .select()
            .eq('userId', user.id)
            .single()
        : { data: null };

    console.log(`User data in middleware ${JSON.stringify(userData,null,2)}`)

    const role = barangayData?.role || userData?.role || undefined;
    console.log(`Role in middleware: ${role?.toString()}`)

    if (!role && pathname !== '/' && !pathname.startsWith('/auth') && !pathname.startsWith('/view')) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const roleRoutes: Record<string, string[]> = {
        player: [`/${RoleTypes.Player}`,`/onboard/${RoleTypes.Player}`],
        barangayAdmin: [`/${RoleTypes.BarangayAdmin}`],
        super: [`/${RoleTypes.SUPER}`],
        team_manager: [`/${RoleTypes.TeamManager}`] // Ensure the key matches the role name
    };

    const allowedRoutes = roleRoutes[role || ''] || [];
    console.log(`Allowed routes for role ${role}: ${allowedRoutes.join(', ')}`)
    console.log(`Current pathname: ${pathname}`)

    const isAllowed = allowedRoutes.some((route: string) => pathname.startsWith(route));
    console.log(`Is allowed: ${isAllowed}`)

    if (!isAllowed && pathname !== '/' && !pathname.startsWith('/auth') && !pathname.startsWith('/view')) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}