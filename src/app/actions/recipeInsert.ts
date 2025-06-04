'use server'

import { Ingredients, PostRecipeDateil, } from "@/Types/types"
import { createClient } from "@/utils/supabase/server"
import { uploaaRecipeImage } from "./uploadImages"

// レシピデータを登録するアクション
export const saveRecipe = async ({ ingredients, recipeMemo, recipeName, recipeImageFile }: PostRecipeDateil) => {
    const registerIngredient: Ingredients[] = []
    for (const ingredient of ingredients) {
        if ('' != ingredient.title) {
            registerIngredient.push({
                title: ingredient.title,
                unit: ingredient.unit,
                quantity: ingredient.quantity,
            })
        }
    }

    const supabase = await createClient()
    let imageUrl

    if (recipeImageFile) {
        imageUrl = await uploaaRecipeImage(recipeImageFile)
    }

    console.log('これは？',recipeName,recipeMemo,imageUrl);
    

    //recipesテーブルにname,recipeMemo,画像のURLを保存
    const { data: resRecipeId, error: recipeError } = await supabase.from('recipes').insert({ name: recipeName, memo: recipeMemo, image_url: imageUrl }).select('*')
    const recipeId = resRecipeId?.[0]?.id ?? null

    console.log('レシピID映るよね？',recipeId);
    

    //ingredientテーブルに材料とrecipe_idを保存
    const ingredientsWithRecipeId = registerIngredient.map((ingredient) => ({ ...ingredient, recipe_id: recipeId }))
    const { error: resIngredientError } = await supabase.from('ingredients').insert(ingredientsWithRecipeId)

    if (recipeError || resIngredientError ) {
        console.log('error発生');
        console.log('recipeError:', recipeError, 'resIngredientError:', resIngredientError);
    }

    else {
        return 'ok'
    }



}
