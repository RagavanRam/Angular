import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { AuthenticationGuard } from 'src/app/authentication/authentication.guard';
import { RecipeResolverService } from './recipe-resolver.service';
import { RecipeSelectComponent } from './recipe-select/recipe-select.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesComponent } from './recipes.component';

const recipesRoute: Routes = [
  {path: '', component: RecipesComponent, canActivate: [AuthenticationGuard], children: [
    {path: '', component: RecipeSelectComponent, pathMatch: 'full'},
    {path: 'new', component: RecipesEditComponent},
    {path: ':id', component: RecipesDetailComponent, resolve: [RecipeResolverService]},
    {path: ':id/edit', component: RecipesEditComponent, resolve: [RecipeResolverService]}
  ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoute)
  ]
})

export class RecipesRoutingModule {}
