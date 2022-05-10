import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ShoppingListComponent } from './shopping-list.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';



@NgModule({
  declarations: [
    ShoppingListComponent,
    IngredientEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ShoppingListComponent}
    ]),
    FormsModule
  ]
})
export class ShoppingListModule { }
