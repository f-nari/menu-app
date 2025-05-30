'use client'

import React, { useState } from 'react'
import Ingredient from '../Ingredient/Ingredient'
import { MenuItemsType, RecipeType } from '@/Types/types'

type Props = {
    recipesProps: RecipeType[]
}
export const MenuSchedule = ({ recipesProps }: Props) => {
    const [menuSchedule, setMenuSchedule] = useState<MenuItemsType[]>([{
        date: new Date,
        meal: {
            breakfast: '',
            lunch: '',
            dinner: '',
        }
    }])

    const onMenuScheduleChanged = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, mealTime: string, propsindex: number) => {
        const changeMenuList = menuSchedule.map((menuList, index) => {
            if (index === propsindex) {
                const newMeal = { ...menuList.meal }
                let newDate = menuList.date
                switch (mealTime) {
                    case 'date':
                        newDate = new Date(e.target.value)
                        break
                    case 'breakfast':
                        newMeal.breakfast = e.target.value;
                        break;
                    case 'lunch':
                        newMeal.lunch = e.target.value;
                        break;
                    case 'dinner':
                        newMeal.dinner = e.target.value;
                        break;
                }
                return {
                    ...menuList,
                    date: newDate,
                    meal: newMeal
                }
            }

            return menuList
        })

        setMenuSchedule(changeMenuList)
    }

    const onEmptyMenuAddButtonClicked = () => {
        const update = [...menuSchedule, {
            date: new Date,
            meal: {
                breakfast: '',
                lunch: '',
                dinner: '',
            }
        }]
        setMenuSchedule(update)
    }

    return (
        <div className='overflow-x-auto w-full'>
            <div className="flex gap-4 min-w-max  ">
                {menuSchedule.map((menuList, index) => (
                    <div className="border rounded-lg p-4 w-72 bg-gray-50 shadow  shrink-0 " key={index}>
                        <input
                            type="date"
                            value={menuList.date.toISOString().split('T')[0]}
                            onChange={(e) => onMenuScheduleChanged(e, 'date', index)}
                            className="w-full mb-3 border px-2 py-1"
                        />
                        {['breakfast', 'lunch', 'dinner'].map((meal, i) => (
                            <div className="flex items-center mt-2" key={i}>
                                <label className="w-10">{meal === 'breakfast' ? '朝' : meal === 'lunch' ? '昼' : '夜'}</label>
                                <select
                                    className="ml-2 border w-full h-10 px-2"
                                    onChange={(e) => onMenuScheduleChanged(e, meal, index)}
                                    defaultValue=""
                                >
                                    <option value="" disabled hidden>ーーー</option>
                                    {recipesProps.map((recipe) => (
                                        <option value={recipe.id} key={recipe.id}>{recipe.name}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                ))}
                <button
                    onClick={onEmptyMenuAddButtonClicked}
                    className="h-12 px-4 rounded bg-green-200 hover:bg-green-300 text-sm mt-20"
                >
                    献立を追加
                </button>
            </div>
            <Ingredient menuSchedule={menuSchedule} />
        </div>
    )
}

export default MenuSchedule