from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import openai
import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Preferences(BaseModel):
    mealType: str
    dietaryPreference: List[str]
    cookingTime: str

class RecipeRequest(BaseModel):
    ingredients: List[str]
    preferences: Preferences

class Recipe(BaseModel):
    id: int
    title: str
    ingredients: List[str]
    cookingTime: str
    mealType: str
    dietaryPreference: List[str]
    description: str
    image: str

@app.post("/api/recipes", response_model=List[Recipe])
async def get_recipes(request: RecipeRequest):
    try:
        # First, let's verify the API key is loaded
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="OpenAI API key not found in environment variables")

        # Construct the prompt for the LLM
        prompt = f"""Given these ingredients: {', '.join(request.ingredients)}
        And these preferences:
        - Meal Type: {request.preferences.mealType}
        - Dietary Preferences: {', '.join(request.preferences.dietaryPreference)}
        - Cooking Time: {request.preferences.cookingTime}

        Generate 3 creative and delicious recipes. For each recipe, provide:
        1. A creative title
        2. List of ingredients (including the ones provided)
        3. Cooking time (Fast/Medium/Long)
        4. Meal type (Breakfast/Lunch/Dinner/Dessert)
        5. Dietary preferences (as a list/array)
        6. A brief, appetizing description
        7. An emoji that best represents the dish

        Format the response as a JSON array of objects with these fields:
        id, title, ingredients, cookingTime, mealType, dietaryPreference (as array), description, image (use the emoji as the image value)"""

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are a creative chef and recipe generator. Generate recipes in JSON format. Make sure dietaryPreference is always an array and use the emoji as the image value."},
                {"role": "user", "content": prompt}
            ],
            response_format={ "type": "json_object" }
        )

        # Parse the response
        recipes_data = response.choices[0].message.content
        recipes = json.loads(recipes_data)
        
        # If the response is a dictionary with a 'recipes' key, get the recipes array
        if isinstance(recipes, dict) and 'recipes' in recipes:
            recipes = recipes['recipes']
        
        # Process each recipe to ensure correct format
        for i, recipe in enumerate(recipes, 1):
            # Ensure dietaryPreference is a list
            if isinstance(recipe.get('dietaryPreference'), str):
                recipe['dietaryPreference'] = [recipe['dietaryPreference']]
            
            # Use emoji as image if image is missing
            if 'emoji' in recipe and 'image' not in recipe:
                recipe['image'] = recipe['emoji']
            
            # Ensure id is set
            recipe['id'] = i

        return recipes

    except Exception as e:
        print(f"Error details: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"status": "ok", "message": "Recipe API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
