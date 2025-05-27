'use server'

import { Ingredients, PostRecipeDateil,  } from "@/Types/types"
import { createClient } from "@/utils/supabase/server"

// レシピデータを登録するアクション
export const saveRecipe = async({ingredients,recipeMemo,recipeName,recipeImageFile}:PostRecipeDateil) => {
    const registerIngredient:Ingredients[] =[]
    for(const ingredient of ingredients){
        if('' != ingredient.title) {
            registerIngredient.push({
                title: ingredient.title,
                unit: ingredient.unit,
                quantity: ingredient.quantity
            })
        }
    }
    
    const supabase = await createClient()

    let recipeImageFileError = null

    //画像をstrageに保存
    const imageFileName = `${Date.now()}_${recipeImageFile?.name}`
    if(recipeImageFile){
        const {error} = await supabase.storage.from('recipeimages').upload(imageFileName,recipeImageFile )
        recipeImageFileError = error
    }

    // 保存した画像のURLを取得
    const { data } = supabase.storage.from('recipeimages').getPublicUrl(imageFileName)
    const imageUrl = data.publicUrl

    //recipesテーブルにname,recipeMemo,画像のURLを保存
    const {data:resRecipeId,error: recipeError} = await supabase.from('recipes').insert({name:recipeName,memo:recipeMemo,image_url:imageUrl}).select('*')    
    const recipeId = resRecipeId?.[0]?.id ?? null

    //ingredientテーブルに材料とrecipe_idを保存
    const ingredientsWithRecipeId = registerIngredient.map((ingredient) => ({...ingredient,recipe_id:recipeId}))
    const {error: resIngredientError } = await supabase.from('ingredients').insert(ingredientsWithRecipeId) 

    if( recipeError||resIngredientError||recipeImageFileError){
        console.log('error発生');
        console.log('recipeError:',recipeError,'resIngredientError:',resIngredientError,'recipeImageFileError:',recipeImageFileError);
    }

    else {
        return 'ok'
    }



}
