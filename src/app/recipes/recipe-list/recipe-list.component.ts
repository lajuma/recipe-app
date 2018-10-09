import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Chocolate Chip Cookies',
      'This are the best chocolate chip cookies you ever made',
      'https://images-gmi-pmc.edge-generalmills.com/095d9d07-e4fb-4404-af61-b01490059114.jpg'),
    new Recipe(
      'Lemon Cake',
      'Super fluffy lemon cake',
      'https://assets.kraftfoods.com/recipe_images/opendeploy/501217_1_1_retail-63b8ed08c02dec22198b0b77c0c1535d22074a87_642x428.jpg')
  ];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
