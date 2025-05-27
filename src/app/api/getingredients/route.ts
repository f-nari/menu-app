import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST (req:Request) {
    
    const supabase = await createClient()
    const {ids} = await req.json()
    
    const signedUrlResults = await Promise.all(
    ids.map(async(i: string)=>(
        supabase.from('ingredients').select('*').eq('recipe_id',`${i}`)
    )))

    return NextResponse.json(signedUrlResults)

}