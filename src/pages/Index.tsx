
import React, { useState } from 'react';
import IngredientInput from '../components/IngredientInput';
import PreferenceSelector from '../components/PreferenceSelector';
import RecipeCard from '../components/RecipeCard';
import { Button } from '../components/ui/button';
import { ChefHat, Utensils, Sparkles } from 'lucide-react';

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
    
    // For now, always show some fake results so you can see how it looks
    const fakeResults = [
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
        title: "Chicken Caesar Salad",
        ingredients: ["chicken", "lettuce", "parmesan", "croutons", "caesar dressing"],
        cookingTime: "Fast",
        mealType: "Lunch",
        dietaryPreference: [],
        description: "Classic Caesar salad with grilled chicken breast",
        image: "🥗"
      },
      {
        id: 3,
        title: "Chocolate Chip Cookies",
        ingredients: ["flour", "butter", "eggs", "chocolate chips", "sugar"],
        cookingTime: "Medium",
        mealType: "Dessert",
        dietaryPreference: ["Vegetarian"],
        description: "Soft and chewy chocolate chip cookies, perfect for any occasion",
        image: "🍪"
      }
    ];
    
    setFoundRecipes(fakeResults);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-xl border-b relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto px-4 py-8 relative">
          <div className="flex items-center gap-3 justify-center">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <ChefHat className="h-8 w-8 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Recipe Finder</h1>
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <Utensils className="h-8 w-8 text-white drop-shadow-lg" />
            </div>
          </div>
          <p className="text-center text-white/90 mt-3 text-lg font-medium drop-shadow">
            Discover amazing recipes with the ingredients you have! ✨
          </p>
          <div className="flex justify-center mt-4">
            <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative">
        {/* Input Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
          <div className="relative">
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
                className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white px-12 py-4 text-xl font-bold rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl border-2 border-white/20 backdrop-blur-sm"
              >
                <Sparkles className="mr-2 h-6 w-6" />
                🔍 Find Amazing Recipes
                <Sparkles className="ml-2 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
            <div className="relative">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center flex items-center justify-center gap-3">
                {foundRecipes.length > 0 
                  ? (
                    <>
                      <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
                      Found {foundRecipes.length} amazing recipe{foundRecipes.length !== 1 ? 's' : ''} for you!
                      <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
                    </>
                  )
                  : "No recipes found with those criteria"}
              </h2>
              
              {foundRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {foundRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 max-w-md mx-auto border border-gray-200 shadow-lg">
                    <p className="text-gray-700 mb-4 text-lg font-medium">
                      Try adjusting your ingredients or preferences to find more recipes.
                    </p>
                    <p className="text-gray-600">
                      💡 Tip: Start with common ingredients like "chicken", "pasta", or "tomatoes"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
