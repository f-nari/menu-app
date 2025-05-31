import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
        const supabase = await createClient()
        let recipeId
        try {
                recipeId = await req.json()
        } catch (error) {
                console.error('Json変換時にエラー', error)
                return NextResponse.json({ error: 'recipeIdの取得時にエラー発生' }, {
                        status: 500
                })

        }

        const { error: recipesDeleteError } = await supabase
                .from('recipes')
                .delete()
                .eq('id', recipeId)

        if (recipesDeleteError) {
                console.error('レシピ削除時にエラー', recipesDeleteError.message);
                return NextResponse.json({ error: 'レシピ削除時にエラーが発生しました' }, {
                        status: 500
                })
        }

        const { error: ingredientsDeleteError } = await supabase
                .from('ingredients')
                .delete()
                .eq('recipe_id', recipeId)

        if (ingredientsDeleteError) {
                console.error('材料削除時にエラー', ingredientsDeleteError.message);
                return NextResponse.json({ error: '材料削除時にエラー' }, {
                        status: 500
                })

        }

        return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
        })


}