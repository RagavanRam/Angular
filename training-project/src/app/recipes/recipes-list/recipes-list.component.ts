import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipesService } from './../../shared/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] | any;
  unsubscribeRecipes: Subscription | undefined;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.unsubscribeRecipes = this.recipesService.updatedRecipes.subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
      }
    );
  }

  toDetail(index: number) {
    this.router.navigate([index], {relativeTo: this.route});
  }

  addRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if(this.unsubscribeRecipes) {
      this.unsubscribeRecipes.unsubscribe();
    }
  }

}
