import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: false },
        like: {type: Number, required: true, default: 0},
    },
    {
        timestamps: true,
    }
);

const recipeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        type: { type: String, required: true },
        image: { type: String, required: true },
        author: { type: String, required: true, unique: false },
        email: { type: String, required: false },
        imgAuthor: { type: String },
        prepTime: { type: Number, required: true },
        hardness: { type: String, required: true },
        origin: { type: String, required: true },
        allergies: [{
            type: String
        }],
        diet: { type: String, required: true },
        coverImg: { type: String, required: true },
        description: { type: String, required: true },
        servings: { type: Number, required: true },
        ingredients: [{
            part: { type: String },
            subIngredients: [{
                amount: { type: Number },
                unit: { type: String },
                what: { type: String },
                identifier: { type: String },
            }]
        }],
        instructions: [{
            type: String
        }],
        nutritionFacts: [{
                nutrition: { type: String },
                amount: { type: Number },
                unit: { type: String },
        }],
        likes: { type: Number, default: 0 },
        reviews: [reviewSchema],
    },
    {
        timestamps: true
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;