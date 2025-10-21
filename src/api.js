import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// --- Auth APIs ---
export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/auth/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${BASE_URL}/auth/login`, credentials);
};

// --- Recipe APIs ---
export const getAllRecipes = async () => {
  return await axios.get(`${BASE_URL}/recipes`);
};

export const getRecipeById = async (id) => {
  return await axios.get(`${BASE_URL}/recipes/${id}`);
};

export const createRecipe = async (recipeData, token) => {
  return await axios.post(`${BASE_URL}/recipes`, recipeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateRecipe = async (id, recipeData, token) => {
  return await axios.put(`${BASE_URL}/recipes/${id}`, recipeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteRecipe = async (id, token) => {
  return await axios.delete(`${BASE_URL}/recipes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const searchRecipes = async (query) => {
  return await axios.get(`${BASE_URL}/recipes/search?query=${query}`);
};

// --- User saved recipes ---
export const saveRecipe = async (recipeID, token) => {
  return await axios.put(`${BASE_URL}/recipes`, { recipeID }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSavedRecipes = async (userId) => {
  return await axios.get(`${BASE_URL}/auth/savedRecipes/${userId}`);
};
