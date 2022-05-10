import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ShoppingListService } from './shopping-list.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shopping-list/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  updatedRecipes = new Subject<Recipe[]>();

  recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updatedRecipes.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.updatedRecipes.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.updatedRecipes.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updatedRecipes.next(this.recipes.slice());
  }

  sentToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.fetchandAddIngredients(ingredients);
  }

}
