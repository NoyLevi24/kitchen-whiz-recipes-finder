
import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Clock } from 'lucide-react';
import { Recipe } from '../pages/Index';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const getTimeColor = (time: string) => {
    switch (time) {
      case 'Fast':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Long':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'Breakfast':
        return 'bg-orange-100 text-orange-800';
      case 'Lunch':
        return 'bg-blue-100 text-blue-800';
      case 'Dinner':
        return 'bg-purple-100 text-purple-800';
      case 'Dessert':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="text-4xl mb-2">{recipe.image}</div>
          <div className="flex gap-1">
            <Badge className={`${getTimeColor(recipe.cookingTime)} text-xs`}>
              <Clock className="h-3 w-3 mr-1" />
              {recipe.cookingTime}
            </Badge>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 leading-tight">
          {recipe.title}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-gray-600 text-sm leading-relaxed">
          {recipe.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            <Badge className={getMealTypeColor(recipe.mealType)}>
              {recipe.mealType}
            </Badge>
            {recipe.dietaryPreference.map((pref, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {pref}
              </Badge>
            ))}
          </div>
          
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Key ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                <span 
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {ingredient}
                </span>
              ))}
              {recipe.ingredients.length > 4 && (
                <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                  +{recipe.ingredients.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
