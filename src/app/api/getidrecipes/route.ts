import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const recipeId = searchParams.get('id')
    const supabase = await createClient()


    const { data: recipeData, error: recipeDataGetErrer } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', recipeId)
        .single()
    // {
    //     id: 80,
    //     created_at: '2025-05-19T08:54:06.326694+00:00',
    //     name: '焼き肉',
    //     genre: null,
    //     user_id: 'eec55fe5-34e2-4909-8927-4ff69c00869d',
    //     updated_at: '2025-05-19T08:54:06.326694',
    //     memo: 'よく焼く。たまに生でも良い',
    //     image_url: 'https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/public/recipeimages/1747644845986_IMG_0782.JPG'
    //   }

    if (recipeDataGetErrer) {
        console.error('レシピデータ取得の際にエラー', recipeDataGetErrer.message);
        return NextResponse.json({ error: 'データの取得の際にエラーが発生しました' }, {
            status: 500
        })
    }

    const { data: resIngredients, error: ingredientsDataError } = await supabase
        .from('ingredients')
        .select('*')
        .eq('recipe_id', recipeId)

    if (ingredientsDataError) {
        console.error('ingredients取得の際にエラー', ingredientsDataError.message);
        return NextResponse.json({ error: ingredientsDataError.message }, {
            status: 500
        })
    }

    const ingredients = resIngredients.map((resIngredient) => (
        { title: resIngredient.title, quantity: resIngredient.quantity, unit: resIngredient.unit }
    ))

    

    const { data: resSignedUrl, error: signedUrlEroor } = await supabase.storage.from('recipeimages').createSignedUrl(recipeData.image_url.replace('https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/public/recipeimages/', ''), 60 * 60 * 24)

    if (signedUrlEroor) {
        console.error('署名付きURL作成時にエラーが発生', signedUrlEroor.message);
        return NextResponse.json({ error: '画像の取得に失敗しました' }, {
            status: 500
        })
    }

    const signedUrl = resSignedUrl?.signedUrl
    const recipeDatasWithiSignedUrl = { ...recipeData, signedUrl, recipeIngredients: ingredients }

    return NextResponse.json(recipeDatasWithiSignedUrl)
}