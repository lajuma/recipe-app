import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService {

  ingredientsChanged  = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 10)
  ];

  constructor() { }

  // return instance of ingredients array
  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  // former onIngredientAdded
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {

    // sort out double values in the shopping list, but still add the amount of the ingredient
    const temp = ingredients.slice();
    this.ingredients.forEach((ingredient: Ingredient) => {
      const index = temp.findIndex((i) => ingredient.name === i.name);
      if (index !== -1) {
        ingredient.amount += temp[index].amount;
        temp.splice(index, 1);
      }
    });

    // ingredients.forEach((ingredient: Ingredient) => {
    //   this.addIngredient(ingredient);
    // });
    // --> this will emit a lot of events, so we push first all ingredients and then emit one event instead:
    this.ingredients.push(...temp);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
