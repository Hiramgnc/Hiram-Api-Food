const { Router } = require("express");
const router = Router();
const axios = require("axios") ;
const { Diet } = require("../db.js");
require('dotenv').config();
const { YOUR_API_KEY } = process.env;




router.get("/", async (req, res) => {
        //Traigo todas las recetas de la api
        const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
        const diets = dietsApi.data?.results.map(e => e.diets);
        const dietsEach = diets.flat().concat("vegetarian", "Ketogenic");
        const finalList = [...new Set(dietsEach)];

        finalList.forEach( e => {
            Diet.findOrCreate({
                where: {name: e}
            });
        });

        const allDiets = await Diet.findAll();
        res.status(200).send(allDiets);

});




module.exports = router;