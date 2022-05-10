import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ShoppingListService } from './../shared/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients: Ingredient[] | any;
  unsubscribe: Subscription | undefined;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.unsubscribe = this.shoppingListService.updatedIngredients.subscribe(
      (data: Ingredient[]) => {
        this.ingredients = data;
      }
    );
  }

  editIngredient(index: number) {
    this.shoppingListService.sendIngredient.next(index);
  }

  ngOnDestroy(): void {
    if(this.unsubscribe) {
      this.unsubscribe.unsubscribe();
    }
  }

}
