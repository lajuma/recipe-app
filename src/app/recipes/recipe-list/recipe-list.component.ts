import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
  recipes: Recipe[];
  subscription: Subscription;
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    // this subscribes to the recipesChanged Subject inside the recipeService, which creates a new Recipes Array to display the updated
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }
}
