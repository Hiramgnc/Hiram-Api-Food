const { Router } = require('express');
const { Recipe, Diet } = require('../db');
require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const axios = require('axios');

const router = Router();

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
    const apiData = await apiUrl.data.map(e => {
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            summary: e.summary,
            spoonacularScore: e.spoonacularScore,
            steps: e.analyzedInstructions[0]?.steps.map((e) => {return e.step}),
            analyzedInstructions: e.analyzedInstructions,
            healthScore: e.healthScore,
            diets: e.diets.map( (e) => {return {name: e}}),
        }
    })
    return apiData;
}

module.exports = router