import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

//すべてのレシピデータを取得する
export async function GET() {
    const supabase = await createClient()

    const { data: recipesGetData, error: recipesGetError } = await supabase
        .from('recipes')
        .select('*')

    if (recipesGetError) {
        return NextResponse.json({ error: recipesGetError.message }, {
            status: 500
        })
    }

    let signedUrlResults

    try {
        signedUrlResults = await Promise.all(
            recipesGetData.map(async (recipe_data) => {
                const imagePath = recipe_data.image_url.replace('https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/public/recipeimages/', '')
                const { data, error } = await supabase.storage.
                    from('recipeimages')
                    .createSignedUrl(imagePath, 60 * 60 * 24)

                if (error) {
                    console.error('signedUrlを取得時にエラー発生', error);
                    return { signedUrl: null }
                }
                return { signedUrl: data.signedUrl }
            })
        )
    } catch (error) {
        console.error('プロミス中にエラーが発生', error);
        return NextResponse.json({ error: '画像URL取得中にエラー発生' }, {
            status: 500
        })
    }

    const recipeDatasWithiSignedUrlResults = recipesGetData.map((recipeData, index) => (
        { ...recipeData, signedUrl: signedUrlResults[index]?.signedUrl }
    ))

    const recipeDatasWithiSignedUrl = recipeDatasWithiSignedUrlResults.map((recipeData) => ({
        id: String(recipeData.id),
        created_at: recipeData.created_at,
        name: recipeData.name,
        memo: recipeData.memo,
        signedUrl: recipeData.signedUrl
    }))

    return NextResponse.json(recipeDatasWithiSignedUrl)
}