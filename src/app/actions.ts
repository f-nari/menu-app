'use server'

import { createClient } from "@/utils/supabase/server"
import { Ingredients } from "./recipe_creation/page"

type RecipeProps = {
    ingredientsstate: Ingredients[],
    memo:string,
    recipename:string
    recipeImageFile:File|undefined
}

// レシピデータを登録するアクション
export const recipe_save = async({ingredientsstate,memo,recipename,recipeImageFile}:RecipeProps) => {
    const ingredient_insert = ingredientsstate.map((ingredient)=>({
        title:ingredient.title,
        unit:ingredient.unit,
        quantity:ingredient.quantity
    }))

    console.log('fileの中身です',recipeImageFile);
    // File {
    //     size: 224694,
    //     type: 'image/jpeg',
    //     name: 'IMG_2311.JPG',
    //     lastModified: 1745419604621
    //   }
    
    
    const supabase = await createClient()

    //画像をstrageに保存
    const fileName = `${Date.now()}_${recipeImageFile.name}`
    const {error:recipeImageFileError } = await supabase.storage.from('recipe-images').upload(fileName,recipeImageFile )

    // 保存した画像のURLを取得
    const { data } = supabase.storage.from('recipe_images').getPublicUrl(fileName)
    const imageUrl = data.publicUrl

    //recipesテーブルにname,memo,画像のURLを保存
    const {data:recipeNameId,error: recipeError} = await supabase.from('recipes').insert({name:recipename,memo:memo,image_url:imageUrl}).select('*')
    const recipe_id = recipeNameId?.[0]?.id ?? null

    //ingredientテーブルに材料とrecipe_idを保存
    const ingredient_insert_withId = ingredient_insert.map((ingredient) => ({...ingredient,recipe_id:recipe_id}))
    const {error: ingredientError } = await supabase.from('ingredients').insert(ingredient_insert_withId) 

    if( recipeError||ingredientError||recipeImageFileError){
        console.log('error発生');
        console.log('recipeError:',recipeError,'ingredientError:',ingredientError,'recipeImageFileError:',recipeImageFileError);
    }

}