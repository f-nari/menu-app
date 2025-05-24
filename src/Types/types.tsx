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
