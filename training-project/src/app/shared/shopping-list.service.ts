import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shopping-list/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  updatedIngredients = new Subject<Ingredient[]>();
  sendIngredient = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('bread', 2),
    new Ingredient('Appple', 3)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients.slice()[index]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.updatedIngredients.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.updatedIngredients.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.updatedIngredients.next(this.ingredients.slice());
  }

  fetchandAddIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.updatedIngredients.next(this.ingredients.slice());
  }
}
