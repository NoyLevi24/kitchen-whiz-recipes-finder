
import React from 'react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Clock } from 'lucide-react';
import { Preferences } from '../pages/Index';

interface PreferenceSelectorProps {
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
}

const mealTypes = [
  { value: "Breakfast", label: "🌅 Breakfast", icon: "☀️" },
  { value: "Lunch", label: "🥗 Lunch", icon: "🌤️" },
  { value: "Dinner", label: "🍽️ Dinner", icon: "🌙" },
  { value: "Dessert", label: "🍰 Dessert", icon: "🍭" }
];

const dietaryPreferences = [
  { value: "Vegan", label: "🌱 Vegan" },
  { value: "Vegetarian", label: "🥬 Vegetarian" },
  { value: "Gluten-Free", label: "🌾 Gluten-Free" },
  { value: "Dairy-Free", label: "🥛 Dairy-Free" },
  { value: "Low-Carb", label: "🥩 Low-Carb" },
  { value: "Keto", label: "🥑 Keto" }
];

const cookingTimes = [
  { value: "Fast", label: "⚡ Fast (Under 30 min)" },
  { value: "Medium", label: "⏱️ Medium (30-60 min)" },
  { value: "Long", label: "🕐 Long (Over 1 hour)" }
];

const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({ preferences, setPreferences }) => {
  const handleMealTypeChange = (value: string) => {
    setPreferences({
      ...preferences,
      mealType: value === preferences.mealType ? "" : value
    });
  };

  const handleDietaryPreferenceChange = (value: string, checked: boolean) => {
    if (checked) {
      setPreferences({
        ...preferences,
        dietaryPreference: [...preferences.dietaryPreference, value]
      });
    } else {
      setPreferences({
        ...preferences,
        dietaryPreference: preferences.dietaryPreference.filter(pref => pref !== value)
      });
    }
  };

  const handleCookingTimeChange = (value: string) => {
    setPreferences({
      ...preferences,
      cookingTime: value === preferences.cookingTime ? "" : value
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-200">
      {/* Meal Type */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          🍽️ Meal Type
        </Label>
        <Select value={preferences.mealType} onValueChange={handleMealTypeChange}>
          <SelectTrigger className="bg-gray-50 border-gray-200">
            <SelectValue placeholder="Any meal type" />
          </SelectTrigger>
          <SelectContent>
            {mealTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dietary Preferences */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          🥗 Dietary Preferences
        </Label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {dietaryPreferences.map((pref) => (
            <div key={pref.value} className="flex items-center space-x-2">
              <Checkbox
                id={pref.value}
                checked={preferences.dietaryPreference.includes(pref.value)}
                onCheckedChange={(checked) => 
                  handleDietaryPreferenceChange(pref.value, checked as boolean)
                }
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <Label htmlFor={pref.value} className="text-sm font-medium cursor-pointer">
                {pref.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Cooking Time */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Cooking Time
        </Label>
        <Select value={preferences.cookingTime} onValueChange={handleCookingTimeChange}>
          <SelectTrigger className="bg-gray-50 border-gray-200">
            <SelectValue placeholder="Any cooking time" />
          </SelectTrigger>
          <SelectContent>
            {cookingTimes.map((time) => (
              <SelectItem key={time.value} value={time.value}>
                {time.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PreferenceSelector;
