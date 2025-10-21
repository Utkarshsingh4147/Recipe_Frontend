import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { getAllRecipes } from '../api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllRecipes()
      .then(res => {
        setRecipes(res.data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">All Recipes</h1>

        {isLoading ? (
          <p className="text-xl text-center text-blue-600 font-semibold mt-10">
            Loading recipes...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;