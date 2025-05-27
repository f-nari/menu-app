//supabaseからデータを取得する用
export type RecipeType = {
  id: string
  created_at: string,
  recipeName: string,
  recipeMemo: string,
  recipeSignedurl: string
  recipeImageurl:File|null,
  recipeIngredients:Ingredients[]
}

//投稿フォームからレシピを送信する用
export type PostRecipeDateil = {
  recipeName: string,
  recipeImageFile: File | null,
  recipeMemo: string,
  ingredients: Ingredients[]
}

export type Ingredients = {
  id?: number
  title?: string;
  quantity?: number;
  unit?: string
}

export type MenuItemsType = {
  date: Date,
  meal: {
    breakfast: string,
    lunch: string,
    dinner: string
  }
}
