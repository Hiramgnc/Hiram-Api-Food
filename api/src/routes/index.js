const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const recipeRouter = require('./recipe.js')
// const dietRouter = require('./diet.js')

router.use('/recipe', recipeRouter)
// router.use('/diet', dietRouter)

module.exports = router;
