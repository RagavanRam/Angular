import { Ingredient } from '../shopping-list/ingredient.model';

export class Recipe {
  constructor(
    public name: string,
    public imagePath: string,
    public description: string,
    public ingredients: Ingredient[]
  ) { }
}
