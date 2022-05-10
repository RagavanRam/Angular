import { RecipeResolverService } from './recipe-resolver.service';
import { CutoutPipe } from './../shared/cutout.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from './recipes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RecipeComponent } from './recipes-list/recipe/recipe.component';
import { RecipesComponent } from './recipes.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeSelectComponent } from './recipe-select/recipe-select.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeComponent,
    RecipesEditComponent,
    RecipesDetailComponent,
    RecipeSelectComponent,
    CutoutPipe
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    NgbModule
  ]
})
export class RecipesModule { }
