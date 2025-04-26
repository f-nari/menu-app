import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

//レシピデータを取得する
export async function GET()  {
    const supabase = await createClient()
    const { data:recipeDatas, error } = await supabase
    .from('recipes')
    .select('*')

    if (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
    const signedUrlResults = await Promise.all(
        recipeDatas.map(async(recipe_data)=>(
            supabase.storage.from('recipeimages').createSignedUrl(recipe_data.image_url.replace('https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/public/recipeimages/','')
            , 60)
            
        ))
    )

    const recipeDatasWithiSignedUrlResults = recipeDatas.map((recipeData,index)=>(
        {...recipeData,signedUrl:signedUrlResults[index]?.data?.signedUrl}
    ))

    const recipeDatasWithiSignedUrl = recipeDatasWithiSignedUrlResults.map((recipeData)=>({
        id:recipeData.id,
        created_at : recipeData.created_at,
        name:recipeData.name,
        memo:recipeData.memo,
        signedUrl: recipeData.signedUrl
    }))

    


    return NextResponse.json(recipeDatasWithiSignedUrl)
}