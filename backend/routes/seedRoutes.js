import express from 'express';
import Recipe from '../models/recipeModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Recipe.deleteMany({}); 
    const createdRecipes = await Recipe.insertMany(data.recipies);
    await User.deleteMany({}); 
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdRecipes, createdUsers });
});

export default seedRouter;