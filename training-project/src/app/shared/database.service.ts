import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient, private recipeService: RecipesService, private authService: AuthenticationService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://training-project-bc270-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes);
  }

  fetchRecipes() {
      return this.http.get<Recipe[]>('https://training-project-bc270-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json').pipe(
        map(
          recipes => {
            return recipes.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              }
            })
          }
        ),
        tap( recipes => {
          this.recipeService.setRecipe(recipes);
        })
      )
    }
}
