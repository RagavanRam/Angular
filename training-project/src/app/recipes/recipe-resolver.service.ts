import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RecipesService } from '../shared/recipes.service';
import { DatabaseService } from '../shared/database.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private DB: DatabaseService, private recipesService: RecipesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if(recipes.length === 0) {
      return this.DB.fetchRecipes()
    }else {
      return recipes;
    }
  }
}
