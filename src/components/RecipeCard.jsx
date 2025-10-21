import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => (
  <div className="bg-white rounded shadow p-4 hover:shadow-lg transition">
    <Link to={`/recipe/${recipe._id}`}>
      <img src={recipe.imageUrl} alt={recipe.title} className="h-48 w-full object-cover rounded mb-2" />
      <h2 className="font-bold text-lg">{recipe.title}</h2>
      <p className="text-sm">{recipe.description}</p>
      <p className="text-xs mt-1">Cooking Time: {recipe.cookingTime} mins</p>
    </Link>
  </div>
);

export default RecipeCard;
