
import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Heart, Star, ArrowLeft, Users, ChefHat } from 'lucide-react';
import { Recipe } from '../pages/Index';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const getTimeColor = (time: string) => {
    switch (time) {
      case 'Fast':
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg';
      case 'Medium':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg';
      case 'Long':
        return 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg';
    }
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'Breakfast':
        return 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg';
      case 'Lunch':
        return 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg';
      case 'Dinner':
        return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg';
      case 'Dessert':
        return 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
      
      <div className="relative">
        {/* Back button */}
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6 bg-white/80 hover:bg-white border-2 border-purple-200 hover:border-purple-400 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Results
        </Button>

        {/* Recipe header */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 filter drop-shadow-lg">
            {recipe.image}
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {recipe.title}
          </h1>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            {recipe.description}
          </p>
          
          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="h-6 w-6 text-yellow-500 fill-current" />
            <Star className="h-6 w-6 text-yellow-500 fill-current" />
            <Star className="h-6 w-6 text-yellow-500 fill-current" />
            <Star className="h-6 w-6 text-yellow-500 fill-current" />
            <Star className="h-6 w-6 text-yellow-300 fill-current" />
            <span className="text-lg text-gray-600 ml-2 font-medium">(4.2) • 127 reviews</span>
          </div>

          {/* Recipe meta info */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className={`${getTimeColor(recipe.cookingTime)} text-lg font-bold border-0 px-4 py-2`}>
              <Clock className="h-5 w-5 mr-2" />
              {recipe.cookingTime}
            </Badge>
            <Badge className={`${getMealTypeColor(recipe.mealType)} text-lg font-bold border-0 px-4 py-2`}>
              <ChefHat className="h-5 w-5 mr-2" />
              {recipe.mealType}
            </Badge>
            <Badge className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-lg font-bold border-0 px-4 py-2">
              <Users className="h-5 w-5 mr-2" />
              Serves 4
            </Badge>
          </div>

          {/* Dietary preferences */}
          {recipe.dietaryPreference.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {recipe.dietaryPreference.map((pref, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-base bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 text-teal-700 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 font-medium px-4 py-2"
                >
                  {pref}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Recipe content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <Card className="bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200">
            <CardHeader>
              <h2 className="text-2xl font-bold text-orange-800 flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                Ingredients
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-3 text-lg">
                    <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-800 font-medium capitalize">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200">
            <CardHeader>
              <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-purple-600" />
                Instructions
              </h2>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex gap-3 text-lg">
                  <span className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1">
                    1
                  </span>
                  <span className="text-gray-800 leading-relaxed">
                    Prepare all ingredients according to the recipe requirements. Wash and chop vegetables as needed.
                  </span>
                </li>
                <li className="flex gap-3 text-lg">
                  <span className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1">
                    2
                  </span>
                  <span className="text-gray-800 leading-relaxed">
                    Follow the cooking method appropriate for this dish, maintaining proper temperatures and timing.
                  </span>
                </li>
                <li className="flex gap-3 text-lg">
                  <span className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1">
                    3
                  </span>
                  <span className="text-gray-800 leading-relaxed">
                    Season to taste and serve hot. Garnish as desired and enjoy your delicious homemade meal!
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-lg">
            <Heart className="mr-2 h-5 w-5" />
            Save Recipe
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-purple-300 hover:border-purple-500 bg-white hover:bg-purple-50 px-8 py-3 text-lg font-bold rounded-xl shadow-lg"
          >
            Share Recipe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
