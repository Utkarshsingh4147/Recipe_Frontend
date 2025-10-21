import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { getAllRecipes } from '../api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes()
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">All Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
