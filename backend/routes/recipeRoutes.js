import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import { isAdmin, isAuth } from '../utils.js';
import fs from "fs";
import path from 'path';
const __dirname = path.resolve();

const recipeRouter = express.Router();

recipeRouter.get('/', async (req, res) => {
    const recipies = await Recipe.find();
    res.send(recipies);
})

recipeRouter.get('/latest', async (req, res) => {
    const recipies = await Recipe.find().sort({ createdAt: -1 });
    res.send(recipies);
})


recipeRouter.post(
    '/', isAuth,
    expressAsyncHandler(async (req, res) => {
        const newRecipe = new Recipe({
            title: 'Just a sample title ' + Date.now(),
            slug: 'sample-name-' + Date.now(),
            category: "Sample category",
            type: "Sample type",
            image: "/images/menus/menu84.jpg",
            author: "Jane Doe",
            email: "recipe@notura.com",
            imgAuthor: "/images/avatars/avatar12.png",
            prepTime: 10,
            hardness: "Simple",
            origin: "Country",
            allergies: ["Sample"],
            diet: "Sample",
            coverImg: "/images/covers/menu144.jpg",
            description: "Here is a recipe I created after having this dish in a restaurant. Enjoy!",
            servings: 0,
            ingredients: [
               {
                    part: "For part one...",
                    subIngredients: [
                        {
                            amount: 1,
                            unit: "g",
                            what: "For the whatever",
                        },
                        {
                            amount: 1,
                            unit: "g",
                            what: "For the whatever",
                        }
                    ],
                },
                {   
                    part: "For part two...",
                    subIngredients: [
                        {
                            amount: 1,
                            unit: "g",
                            what: "For the whatever"
                        },
                        {
                            amount: 1,
                            unit: "g",
                            what: "For the whatever"
                        },
                    ],
                },
            ],
            instructions: [
                "In step 1",
                "In step 2",
                "In step 3",
            ],
            nutritionFacts: [
                {
                    nutrition: "Nothing",
                    amount: 10.0,
                    unit: "g"
                },
                {
                    nutrition: "More nothing",
                    amount: 10.0,
                    unit: "g"
                },
            ],
            likes: 0
        });
        const recipe = await newRecipe.save();
        res.send({ message:"Recipe created", recipe });
    })
)

recipeRouter.post(
    '/user', isAuth, 
    expressAsyncHandler(async (req, res) => {
        const newRecipe = new Recipe({
            title: 'Just a sample title ' + Date.now(),
            slug: 'sample-name-' + Date.now(),
            category: "Sample category",
            type: "Sample type",
            image: "/thumbnail/Thumbnail-62c9d225ebf68e1c148cb21f.jpeg",
            author: "Jane Doe",
            email: "recipe@notura.com",
            imgAuthor: "/avatar/Avatar-1656494294668.jpeg",
            prepTime: 10,
            hardness: "Simple",
            origin: "Country",
            allergies: ["Sample"],
            diet: "Sample",
            coverImg: "/covers/Cover-62c9d225ebf68e1c148cb21f.jpeg",
            description: "Here is a recipe I created after having this dish in a restaurant. Enjoy!",
            servings: 0,
            ingredients: [
               {
                    part: "For part one...",
                    subIngredients: [
                        {
                            amount: 1,
                            unit: "g",
                            what: "For the whatever",
                        },
                        {
                            amount: 1,
                            unit: "g",
                            what: "For the whatever",
                        }
                    ],
                },
                {   
                    part: "For part two...",
                    subIngredients: [
                        {
                            amount: 1,
                            unit: "g",
                            what: "For the whatever"
                        },
                        {
                            amount: 1,
                            unit: "g",
                            what: "For the whatever"
                        },
                    ],
                },
            ],
            instructions: [
                "In step 1",
                "In step 2",
                "In step 3",
            ],
            nutritionFacts: [
                {
                    nutrition: "Nothing",
                    amount: 10.0,
                    unit: "g"
                },
                {
                    nutrition: "More nothing",
                    amount: 10.0,
                    unit: "g"
                },
            ],
            likes: 0
        });
        const recipe = await newRecipe.save();
        res.send({ message:"Recipe created", recipe });
    })
)

recipeRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        if(recipe){
            recipe.title = req.body.title;
            recipe.slug = req.body.slug;
            recipe.author = req.body.author;
            recipe.email = req.body.email;
            recipe.imgAuthor = req.body.imgAuthor;
            recipe.description = req.body.description;
            recipe.category = req.body.category;
            recipe.type = req.body.type;
            recipe.coverImg = req.body.coverImg;
            recipe.image = req.body.thumbnail;
            recipe.prepTime = req.body.prepTime;
            recipe.hardness = req.body.hardness;
            recipe.origin = req.body.origin;
            recipe.allergies = req.body.allergies;
            recipe.diet = req.body.diet;
            recipe.servings = req.body.servings;
            recipe.ingredients = req.body.ingredients;
            recipe.instructions = req.body.instructions;
            recipe.nutritionFacts = req.body.nutritionFacts;
            recipe.likes = req.body.likes;
            await recipe.save();
            res.send({ message: 'Recipe updated' });
        }else{
            res.status(404).send({ message: 'Recipe not found' });
        }
    })
);

recipeRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const recipe = await Recipe.findById(req.params.id);
        if(recipe){
            /*
            // delete recipe image --> if image exist is not checked here
            const coverPath = recipe.coverImg;
            const thumbNailPath = recipe.image;
            fs.unlink(__dirname+coverPath,(err) => {
                if(err) throw err;
                console.log("Cover image deleted");
            });
            fs.unlink(__dirname+thumbNailPath,(err) => {
                if(err) throw err;
                console.log("Thumbnail image deleted");
            });
            */
            await recipe.remove();
            res.send({ message: 'Recipe deleted' });
        }else{
            res.status(404).send({ message: 'Recipe not found' });
        }

    })
);

recipeRouter.delete(
    '/user/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const recipe = await Recipe.findById(req.params.id);
        const email = req.user.email;
        if(recipe && recipe.email === email){ 
            await recipe.remove();
            res.send({ message: 'Recipe deleted' });
        }else{
            res.status(404).send({ message: 'Recipe not found' });
        }

    })
);


recipeRouter.get(
    '/:id/reviews/:email',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const recipeId = req.params.id;
        const email = req.params.email;
        const recipe = await Recipe.findById(recipeId);
        if(recipe){
            const like = 0;
            if(recipe.reviews.find((x) => x.email === email)){
                res.send({
                    like: 1
                })
            }else{
                res.send({
                    like: 0
                })
            }
        }else{
            res.status(404).send({ message: "We do not know if this page is bookmarked or not" });
        }
    }) 
);

recipeRouter.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        if(recipe){
            if(recipe.reviews.find((x) => x.name === req.user.name)){
                // remove previous like / heart / bookmark
               recipe.reviews = recipe.reviews.filter(item => item.name !== req.user.name);
               recipe.likes = recipe.reviews.length;
               await recipe.save();
            }else{
                const review = {
                    name: req.user.name,
                    email: req.user.email,
                    like: req.body.like,
                }
                recipe.reviews.push(review);
                recipe.likes = recipe.reviews.length;
                await recipe.save();
            }
            res.status(201).send({
                message: "Bookmark change registerd",
            })
        }else{
            res.status(404).send({ message: "Recipe to bookmark not found" });
        }
    })
);

recipeRouter.get(
    '/bookmarked', 
    isAuth,
    async (req, res) => {
    const email = req.user.email;
    const recipes = await Recipe.find();
    let filtered = recipes.filter(item => item.reviews.length > 0);

    let bookmarked = filtered.filter(bookmarked => {

        if(bookmarked.reviews.filter(registered => {
            return registered.email === email
        }).length === 1){
            return true;
        }else{
            return false;
        }
        
    });
   if(bookmarked){
        res.send(bookmarked);
    } else{
        res.status(404).send({message: 'Bookmarked recipes not found'});
    } 
});

const PAGE_SIZE = 5;

recipeRouter.get(
    '/user',
    isAuth,
    expressAsyncHandler(async (req, res) => {

        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const email = req.user.email;

        const recipes = await Recipe.find({ email: email }).skip(pageSize * (page - 1))
        .limit(pageSize);

        const countRecipes = await Recipe.countDocuments({ email: email });

        res.send({
            recipes,
            countRecipes,
            page,
            pages: Math.ceil(countRecipes / pageSize),
        });
    })
);

recipeRouter.get(
    '/admin',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const recipes = await Recipe.find()
        .skip(pageSize * (page - 1))
        .limit(pageSize);
        const countRecipes = await Recipe.countDocuments();

        res.send({
            recipes,
            countRecipes,
            page,
            pages: Math.ceil(countRecipes / pageSize),
        });
    })
);

recipeRouter.get(
    '/slug/:slug', 
    expressAsyncHandler( async (req, res) => {
        const recipe = await Recipe.findOne({slug: req.params.slug });
        if(recipe){
            res.send(recipe);
        } else{
            res.status(404).send({message: 'Recipe not found'});
        }
}));

recipeRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const recipe = await Recipe.findById(req.params.id);
      if (recipe) {
        res.send(recipe);
      } else {
        res.status(404).send({ message: 'Recipe not found' });
      }
    })
)

recipeRouter.get('/category/:category', expressAsyncHandler( async (req, res) => {
    let category = req.params.category;
    const recipes = await Recipe.find();
    let filtered = recipes.filter((item) => item.category === category);
   if(filtered){
        res.send(filtered);
    } else{
        res.status(404).send({message: 'Recipes not found'});
    } 
}));

export default recipeRouter;