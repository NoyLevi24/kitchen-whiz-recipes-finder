
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { X, Plus } from 'lucide-react';

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
    <div className="space-y-4">
      <div>
        <Label htmlFor="ingredients" className="text-lg font-semibold text-gray-700">
          What ingredients do you have?
        </Label>
        <p className="text-sm text-gray-500 mt-1">
          Type an ingredient and press Enter or click the plus button to add it
        </p>
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            id="ingredients"
            value={currentIngredient}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., chicken, tomatoes, pasta..."
            className="text-base"
          />
          
          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => addSuggestion(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
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
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Added ingredients */}
      {ingredients.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">
            Your ingredients ({ingredients.length}):
          </Label>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-3 py-1 bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 hover:text-orange-600"
                >
                  <X className="h-3 w-3" />
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
