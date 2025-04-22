'use server'

import { createClient } from "@/utils/supabase/server"
import { Ingredients } from "./recipe_creation/page"

type RecipeProps = {
    ingredientsstate: Ingredients[],
    memo:string,
    recipename:string
}

// レシピデータを登録するアクション
export const recipe_save = async({ingredientsstate,memo,recipename}:RecipeProps) => {
    const ingredient_insert = ingredientsstate.map((ingredient)=>({
        title:ingredient.title,
        unit:ingredient.unit,
        quantity:ingredient.quantity
    }))
    
    const supabase = await createClient()

    const {data,error: recipeError} = await supabase.from('recipes').insert({name:recipename,memo:memo,}).select('*')
    const recipe_id = data?.[0]?.id ?? null
    console.log('登録した結果',data);
    

    const ingredient_insert_withId = ingredient_insert.map((ingredient) => ({...ingredient,recipe_id:recipe_id}))
    const {error: ingredientError } = await supabase.from('ingredients').insert(ingredient_insert_withId) 

    if( recipeError||ingredientError){
        console.log('error発生');
        console.log(recipeError,ingredientError);
    }

}