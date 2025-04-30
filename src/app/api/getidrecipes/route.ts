import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function  GET(request:Request)  {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const supabase = await createClient()
    const { data:recipeData, error:recipe_dataErrer } = await supabase
    .from('recipes')
    .select('*')
    .eq('id',id)
    .single()

    const {data:ingredientsData,error:ingredientsDataError} = await supabase
    .from('ingredients')
    .select('*')
    .eq('recipe_id',id)

    // [
    //     {
    //       id: 69,
    //       created_at: '2025-04-26T09:48:56.64247+00:00',
    //       title: 'のり',
    //       recipe_id: 53,
    //       quantity: 44,
    //       unit: 'fb',
    //       updated_at: '2025-04-26T09:48:56.64247'
    //     },
    //     {
    //       id: 70,
    //       created_at: '2025-04-26T09:48:56.64247+00:00',
    //       title: 'naog',
    //       recipe_id: 53,
    //       quantity: 44,
    //       unit: 'sb',
    //       updated_at: '2025-04-26T09:48:56.64247'
    //     }
    //   ]

    if(ingredientsDataError){
        return NextResponse.json({error:ingredientsDataError.message},{status:500})
    }

    const ingredientsDataList =  ingredientsData.map((ingredient)=>(
        {ingredientName:ingredient.title,quantity:ingredient.quantity,unit:ingredient.unit}
    ))

    const resSignedUrl = await supabase.storage.from('recipeimages').createSignedUrl(recipeData.image_url.replace('https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/public/recipeimages/',''), 60)
    const signedUrl = resSignedUrl['data']?.signedUrl
    const recipeDatasWithiSignedUrl =  {...recipeData,signedUrl,ingredientsDataList}
    // console.log(recipeDatasWithiSignedUrl);

    // {
    //     id: 53,
    //     created_at: '2025-04-26T09:48:56.585135+00:00',
    //     name: 'ハンバーグ',
    //     genre: null,
    //     user_id: 'eec55fe5-34e2-4909-8927-4ff69c00869d',
    //     updated_at: '2025-04-26T09:48:56.585135',
    //     memo: 'gfs',
    //     image_url: 'https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/public/recipeimages/1745660936292_IMG_1083.JPG',
    //     signedUrl: 'https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/sign/recipeimages/1745660936292_IMG_1083.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzNmNzE1ZjEzLWVlMDUtNDNiYS05NmYwLTBlZjNlMjNlMTg1MiJ9.eyJ1cmwiOiJyZWNpcGVpbWFnZXMvMTc0NTY2MDkzNjI5Ml9JTUdfMTA4My5KUEciLCJpYXQiOjE3NDU5Nzk0MjUsImV4cCI6MTc0NTk3OTQ4NX0.e3oBb5fEWN-2oEgAg3yQrFmRtBurYSYb6pGQ4QzvUJY',
    //     ingredientsDataList: [
    //       { ingredientName: 'のり', quantity: 44, unit: 'fb' },
    //       { ingredientName: 'naog', quantity: 44, unit: 'sb' }
    //     ]
    //   }

    return NextResponse.json(recipeDatasWithiSignedUrl)
}