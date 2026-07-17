import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Wird täglich von Vercel Cron aufgerufen (siehe vercel.json) und hält das
// Supabase-Gratis-Projekt wach: jeder API-Request zählt als Aktivität,
// pausiert wird erst nach 7 Tagen komplett ohne Requests.
export async function GET() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
        return NextResponse.json({ ok: false, error: 'missing env' }, { status: 500 })
    }
    try {
        const res = await fetch(`${url}/rest/v1/profiles?select=id&limit=1`, {
            headers: { apikey: key, Authorization: `Bearer ${key}` },
            cache: 'no-store',
        })
        // RLS liefert anonym schlicht 0 Zeilen — der Aufruf selbst genügt.
        return NextResponse.json({ ok: res.ok, status: res.status, at: new Date().toISOString() })
    } catch (e) {
        return NextResponse.json({ ok: false, error: String(e) }, { status: 502 })
    }
}
