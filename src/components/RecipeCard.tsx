
import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Heart, Star } from 'lucide-react';
import { Recipe } from '../pages/Index';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
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
    <Card className="hover:shadow-2xl transition-all duration-500 border-2 border-white/20 overflow-hidden group hover:scale-105 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-lg relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-50/20 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-700"></div>
      
      <CardHeader className="pb-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge className={`${getTimeColor(recipe.cookingTime)} text-sm font-bold border-0 px-3 py-1`}>
              <Clock className="h-4 w-4 mr-1" />
              {recipe.cookingTime}
            </Badge>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-purple-700 transition-colors duration-300">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <Star className="h-4 w-4 text-yellow-300 fill-current" />
          <span className="text-sm text-gray-600 ml-1">(4.2)</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative">
        <p className="text-gray-700 text-sm leading-relaxed font-medium">
          {recipe.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge className={`${getMealTypeColor(recipe.mealType)} font-bold border-0 px-3 py-1`}>
              {recipe.mealType}
            </Badge>
            {recipe.dietaryPreference.map((pref, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-sm bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 text-teal-700 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 font-medium"
              >
                {pref}
              </Badge>
            ))}
          </div>
          
          <div>
            <p className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500" />
              Key ingredients:
            </p>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                <span 
                  key={index}
                  className="inline-block bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800 text-sm px-3 py-1 rounded-full font-medium border border-orange-200 hover:from-orange-200 hover:to-pink-200 transition-all duration-300"
                >
                  {ingredient}
                </span>
              ))}
              {recipe.ingredients.length > 4 && (
                <span className="inline-block bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm px-3 py-1 rounded-full font-medium border border-purple-200">
                  +{recipe.ingredients.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-medium">Ready to cook?</span>
            <Heart className="h-5 w-5 text-gray-300 hover:text-red-500 cursor-pointer transition-colors duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
