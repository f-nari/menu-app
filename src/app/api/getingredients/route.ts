import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const supabase = await createClient()
    let ids

    try {
        ids = await req.json()
    } catch (error) {
        console.error('jsonエラー', error);
        return NextResponse.json({ error: error }, {
            status: 400,
        })
    }

    let signedUrlResults

    try {
        signedUrlResults = await Promise.all(
            ids.map(async (i: string) => {
                const { data, error } = await supabase.from('ingredients').select('*').eq('recipe_id', `${i}`)
                if (error) {
                    console.error(`recipeid:${i}の取得失敗`, error.message);
                    return { recipe_id: i, error: error.message, data: [] }
                }
                return { recipe_id: i, data }
            }
            ))

    } catch (error) {
        console.log('Promise.all中のエラー', error);
        return NextResponse.json({ error: 'データの取得失敗' }, {
            status: 500
        })

    }



    return NextResponse.json(signedUrlResults)

}