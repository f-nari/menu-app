'use server'

import { Ingredients } from "@/Types/types"
import { createClient } from "@/utils/supabase/server"

type RecipeProps = {
    ingredients: Ingredients[],
    recipeMemo:string,
    recipeName:string
    recipeImageFile:File|undefined
}

// レシピデータを登録するアクション
export const saveRecipe = async({ingredients,recipeMemo,recipeName,recipeImageFile}:RecipeProps) => {
    const ingredient_insert:Ingredients[] =[]
    for(const ingredient of ingredients){
        if('' != ingredient.title) {
            ingredient_insert.push({
                title: ingredient.title,
                unit: ingredient.unit,
                quantity: ingredient.quantity
            })
        }
    }
    
    const supabase = await createClient()

    let recipeImageFileError = null

    //画像をstrageに保存
    const fileName = `${Date.now()}_${recipeImageFile?.name}`
    if(recipeImageFile){
        const {error} = await supabase.storage.from('recipeimages').upload(fileName,recipeImageFile )
        recipeImageFileError = error
    }

    // 保存した画像のURLを取得
    const { data } = supabase.storage.from('recipeimages').getPublicUrl(fileName)
    const imageUrl = data.publicUrl

    //recipesテーブルにname,recipeMemo,画像のURLを保存
    const {data:recipeNameId,error: recipeError} = await supabase.from('recipes').insert({name:recipeName,memo:recipeMemo,image_url:imageUrl}).select('*')    
    const recipe_id = recipeNameId?.[0]?.id ?? null

    //ingredientテーブルに材料とrecipe_idを保存
    const ingredient_insert_withId = ingredient_insert.map((ingredient) => ({...ingredient,recipe_id:recipe_id}))
    const {error: ingredientError } = await supabase.from('ingredients').insert(ingredient_insert_withId) 

    if( recipeError||ingredientError||recipeImageFileError){
        console.log('error発生');
        console.log('recipeError:',recipeError,'ingredientError:',ingredientError,'recipeImageFileError:',recipeImageFileError);
    }

    else {
        return 'ok'
    }



}
