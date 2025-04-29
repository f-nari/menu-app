import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function  GET(request:Request)  {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const supabase = await createClient()
    const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id',id)
    .single()

    const resSignedUrl = await supabase.storage.from('recipeimages').createSignedUrl(data.image_url.replace('https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/public/recipeimages/',''), 60)
    const signedUrl = resSignedUrl['data']?.signedUrl
    const recipeDatasWithiSignedUrl =  {...data,signedUrl}
    console.log(recipeDatasWithiSignedUrl);
    
    if(error){
        return NextResponse.json({error:error.message},{status:500})
    }

    return NextResponse.json(recipeDatasWithiSignedUrl)
}