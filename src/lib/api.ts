import { Recipe, Preferences } from '../pages/Index';

const API_URL = 'http://localhost:8000/api';

export async function findRecipes(ingredients: string[], preferences: Preferences): Promise<Recipe[]> {
  try {
    const response = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients,
        preferences,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}
