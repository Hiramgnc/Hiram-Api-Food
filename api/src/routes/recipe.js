const { Router } = require('express');
const { Recipe, Diet } = require('../db');
require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const axios = require('axios');

const router = Router();

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)

    const apiInfo = apiUrl.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            // name: e.title,
            summary: e.summary,
            spoonacularScore: e.spoonacularScore,
            // //Steps (Esta dentro de un arreglo[] (analized instructions)  => que contiene objetos )
            // steps: e.analyzedInstructions[0]?.steps.map((e) => {return e.step}),
            analyzedInstructions: e.analyzedInstructions,
            healthScore: e.healthScore,
            diets: e.diets.map( (e) => {return {name: e}}),
        }
    })
    return apiInfo
}


const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}


const getAllRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = apiInfo.concat(dbInfo)
    console.log(dbInfo)

    return infoTotal
}



router.get('/', async (req, res) => {
    
        const name = req.query.name;
        const recipesTotal = await getAllRecipes();
    
        if (name) {
            let recipeName = recipesTotal.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
            recipeName.length ? 
            res.status(200).send(recipeName) :
            res.status(404).send('No se encontraron recetas con ese nombre');
        } else {
            res.status(200).send(recipesTotal);
        }

})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const recipesTotal = await getAllRecipes();

    if(id) {
        let recipeId = recipesTotal.filter(e => e.id == id)
        recipeId.length ?
            res.status(200).json(recipeId) :
            res.status(418).json({ msg: 'No se encontro la receta' })
    }
})


router.post('/', async (req, res) => {

    let { 
        title, 
        image, 
        summary, 
        spoonacularScore, 
        analyzedInstructions, 
        healthScore, 
        diets, 
        createdInDB
    } = req.body;


    let recipeCreate = await Recipe.create({
        title,
        image,
        summary,
        spoonacularScore,
        analyzedInstructions,
        healthScore,
        createdInDB
    })

    let dietsDb = await Diet.findAll({
        where: { name: diets }
    });
    recipeCreate.addDiets(dietsDb);

    res.send('Receta creada con exito');

})


module.exports = router