import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from './../../shared/shopping-list.service';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  editIndex: number | any;
  editIngerdient: Ingredient | any;
  @ViewChild('f') form: NgForm | any;
  editMode: boolean = false;
  unsubscribeIngredients: Subscription | undefined;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.unsubscribeIngredients = this.shoppingListService.sendIngredient.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIndex = index;
        this.editIngerdient = this.shoppingListService.getIngredient(index);
        this.form.setValue(
          {
            name: this.editIngerdient.name,
            amount: this.editIngerdient.amount
          }
        )
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editIndex, this.form.value);
    }else {
      this.shoppingListService.addIngredient(this.form.value);
    }
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.editMode = false;
    this.form.reset();
  }

  onCancel() {
    this.editMode = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    if(this.unsubscribeIngredients) {
      this.unsubscribeIngredients.unsubscribe();
    }
  }

}
