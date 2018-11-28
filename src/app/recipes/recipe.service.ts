import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Chocolate Chip Cookies',
      'This are the best chocolate chip cookies you ever made',
      'https://images-gmi-pmc.edge-generalmills.com/095d9d07-e4fb-4404-af61-b01490059114.jpg',
      [
        new Ingredient('Cocolate', 2),
        new Ingredient('Sugar', 1),
        new Ingredient('Eggs', 5)
      ]
    ),
    new Recipe(
      'Lemon Cake',
      'Super fluffy lemon cake',
      'https://assets.kraftfoods.com/recipe_images/opendeploy/501217_1_1_retail-63b8ed08c02dec22198b0b77c0c1535d22074a87_642x428.jpg',
      [
        new Ingredient('Lemons', 2),
        new Ingredient('Sugar', 3),
        new Ingredient('Eggs', 2)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    // return this.recipes.slice()[index];
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  
}
