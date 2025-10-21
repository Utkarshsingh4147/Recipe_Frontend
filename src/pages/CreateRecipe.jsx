import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createRecipe } from '../api';
import { AuthContext } from '../context/AuthContext';

const CreateRecipe = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: '',
    imageUrl: '',
    cookingTime: '',
  });

  const handleChange = (e, index, field) => {
    if (field === 'ingredients') {
      const newIngredients = [...formData.ingredients];
      newIngredients[index][e.target.name] = e.target.value;
      setFormData({ ...formData, ingredients: newIngredients });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addIngredient = () => setFormData({ ...formData, ingredients: [...formData.ingredients, { name: '', quantity: '' }] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRecipe(formData, token);
      alert('Recipe created!');
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
          <input type="text" name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
          <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
          <div>
            <h3 className="font-bold">Ingredients</h3>
            {formData.ingredients.map((ing, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input type="text" name="name" placeholder="Name" value={ing.name} onChange={(e) => handleChange(e, i, 'ingredients')} className="p-2 border rounded flex-1"/>
                <input type="text" name="quantity" placeholder="Quantity" value={ing.quantity} onChange={(e) => handleChange(e, i, 'ingredients')} className="p-2 border rounded flex-1"/>
              </div>
            ))}
            <button type="button" onClick={addIngredient} className="mb-2 text-blue-500">+ Add Ingredient</button>
          </div>
          <textarea name="instructions" placeholder="Instructions" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
          <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
          <input type="number" name="cookingTime" placeholder="Cooking Time (mins)" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
          <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">Create Recipe</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CreateRecipe;
