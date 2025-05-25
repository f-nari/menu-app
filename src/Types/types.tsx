export type RecipeType = {
  id: string
  created_at: string,
  name: string,
  memo: string,
  signedUrl: string
  ingredientsDataList: [{
    ingredientName: string, quantity: number, unit: string
  }]
}

export type MenuItemsType = {
  date: Date,
  meal: {
    breakfast: string,
    lunch: string,
    dinner: string
  }
}

export type IngredientsType = {
  id?: number
  ingredientName: string,
  ingredientQuantity: number,
  ingredientUnit: string
}

export type Ingredients = {
  id?: number
  title?: string;
  quantity?: number;
  unit?: string
}


export type PostRecipeDateil = {
  recipeName: string,
  recipeImageFile: File | null,
  recipeMemo: string,
  ingredent?: Ingredients[]
}

export type RecipeProps = {
  ingredients: Ingredients[],
  recipeMemo:string,
  recipeName:string
  recipeImageFile:File|undefined
}