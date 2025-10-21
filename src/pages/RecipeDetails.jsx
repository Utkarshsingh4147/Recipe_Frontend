import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="min-h-screenflex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 ">
        <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-64 object-cover rounded mb-4" />
        <p className="mb-2"><strong>Description:</strong> {recipe.description}</p>
        <p className="mb-2"><strong>Cooking Time:</strong> {recipe.cookingTime} mins</p>
        <p className="mb-2"><strong>Ingredients:</strong></p>
        <ul className="list-disc list-inside mb-2">
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>{ing.quantity} {ing.name}</li>
          ))}
        </ul>
        <p className="mb-2"><strong>Instructions:</strong></p>
        <p>{recipe.instructions}</p>
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetails;
