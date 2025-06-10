
import React, { useState } from 'react';
import IngredientInput from '../components/IngredientInput';
import PreferenceSelector from '../components/PreferenceSelector';
import RecipeCard from '../components/RecipeCard';
import { Button } from '../components/ui/button';
import { ChefHat, Utensils } from 'lucide-react';

export interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  cookingTime: string;
  mealType: string;
  dietaryPreference: string[];
  description: string;
  image: string;
}

const sampleRecipes: Recipe[] = [
  {
    id: 1,
    title: "Creamy Mushroom Pasta",
    ingredients: ["pasta", "mushrooms", "cream", "garlic", "onion"],
    cookingTime: "Medium",
    mealType: "Dinner",
    dietaryPreference: ["Vegetarian"],
    description: "A rich and creamy pasta dish with sautéed mushrooms",
    image: "🍝"
  },
  {
    id: 2,
    title: "Chocolate Avocado Mousse",
    ingredients: ["avocado", "cocoa powder", "maple syrup", "vanilla"],
    cookingTime: "Fast",
    mealType: "Dessert",
    dietaryPreference: ["Vegan", "Gluten-Free"],
    description: "A healthy, decadent chocolate dessert",
    image: "🍫"
  },
  {
    id: 3,
    title: "Mediterranean Quinoa Bowl",
    ingredients: ["quinoa", "tomatoes", "cucumber", "olives", "feta"],
    cookingTime: "Medium",
    mealType: "Lunch",
    dietaryPreference: ["Vegetarian", "Gluten-Free"],
    description: "Fresh and healthy Mediterranean-inspired bowl",
    image: "🥗"
  },
  {
    id: 4,
    title: "Banana Oat Pancakes",
    ingredients: ["banana", "oats", "eggs", "milk", "cinnamon"],
    cookingTime: "Fast",
    mealType: "Breakfast",
    dietaryPreference: ["Vegetarian"],
    description: "Fluffy, healthy pancakes perfect for morning",
    image: "🥞"
  }
];

export interface Preferences {
  mealType: string;
  dietaryPreference: string[];
  cookingTime: string;
}

const Index = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<Preferences>({
    mealType: "",
    dietaryPreference: [],
    cookingTime: ""
  });
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const findRecipes = () => {
    console.log("Searching for recipes with ingredients:", ingredients);
    console.log("Preferences:", preferences);
    
    const filtered = sampleRecipes.filter(recipe => {
      // Check if recipe contains at least one ingredient
      const hasIngredient = ingredients.length === 0 || 
        ingredients.some(ingredient => 
          recipe.ingredients.some(recipeIngredient => 
            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
          )
        );
      
      // Check meal type preference
      const matchesMealType = !preferences.mealType || 
        recipe.mealType === preferences.mealType;
      
      // Check dietary preferences
      const matchesDietary = preferences.dietaryPreference.length === 0 ||
        preferences.dietaryPreference.some(pref => 
          recipe.dietaryPreference.includes(pref)
        );
      
      // Check cooking time
      const matchesTime = !preferences.cookingTime || 
        recipe.cookingTime === preferences.cookingTime;
      
      return hasIngredient && matchesMealType && matchesDietary && matchesTime;
    });
    
    setFoundRecipes(filtered);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 justify-center">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-800">Recipe Finder</h1>
            <Utensils className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-center text-gray-600 mt-2">
            Tell us what ingredients you have, and we'll find the perfect recipe for you!
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <IngredientInput 
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          
          <PreferenceSelector 
            preferences={preferences}
            setPreferences={setPreferences}
          />
          
          <div className="flex justify-center mt-8">
            <Button 
              onClick={findRecipes}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              🔍 Find Recipes
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {foundRecipes.length > 0 
                ? `Found ${foundRecipes.length} recipe${foundRecipes.length !== 1 ? 's' : ''} for you!`
                : "No recipes found with those criteria"}
            </h2>
            
            {foundRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foundRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Try adjusting your ingredients or preferences to find more recipes.
                </p>
                <p className="text-sm text-gray-500">
                  Tip: Start with common ingredients like "chicken", "pasta", or "tomatoes"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
