
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { X, Plus, Sparkles } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

const commonIngredients = [
  "chicken", "beef", "pork", "fish", "eggs", "milk", "cheese", "butter",
  "rice", "pasta", "bread", "flour", "potatoes", "onions", "garlic", "tomatoes",
  "carrots", "peppers", "mushrooms", "spinach", "broccoli", "lettuce",
  "apples", "bananas", "lemons", "oranges", "berries", "avocado",
  "olive oil", "salt", "pepper", "herbs", "spices", "honey", "sugar"
];

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, setIngredients }) => {
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
      setSuggestions([]);
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleInputChange = (value: string) => {
    setCurrentIngredient(value);
    
    if (value.length > 0) {
      const filtered = commonIngredients
        .filter(ingredient => 
          ingredient.toLowerCase().includes(value.toLowerCase()) &&
          !ingredients.includes(ingredient)
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSuggestion = (suggestion: string) => {
    if (!ingredients.includes(suggestion)) {
      setIngredients([...ingredients, suggestion]);
    }
    setCurrentIngredient("");
    setSuggestions([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="ingredients" className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          What ingredients do you have?
        </Label>
        <p className="text-sm text-gray-600 mt-2 font-medium">
          ✨ Type an ingredient and press Enter or click the plus button to add it
        </p>
      </div>
      
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Input
            id="ingredients"
            value={currentIngredient}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., chicken, tomatoes, pasta..."
            className="text-base border-2 border-orange-200 focus:border-purple-400 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 focus:shadow-xl"
          />
          
          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-2 border-purple-200 rounded-xl shadow-2xl z-10 mt-2 overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => addSuggestion(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-b border-purple-100 last:border-b-0 transition-all duration-300 font-medium text-gray-700 hover:text-purple-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <Button 
          onClick={addIngredient}
          variant="outline"
          size="icon"
          className="shrink-0 border-2 border-orange-300 hover:border-purple-400 bg-gradient-to-r from-orange-100 to-pink-100 hover:from-orange-200 hover:to-pink-200 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5 text-orange-600" />
        </Button>
      </div>

      {/* Added ingredients */}
      {ingredients.length > 0 && (
        <div className="space-y-3">
          <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            Your ingredients ({ingredients.length}):
          </Label>
          <div className="flex flex-wrap gap-3">
            {ingredients.map((ingredient, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 bg-gradient-to-r from-orange-200 to-pink-200 text-orange-800 hover:from-orange-300 hover:to-pink-300 transition-all duration-300 text-sm font-bold rounded-full border-2 border-orange-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 hover:text-red-600 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
