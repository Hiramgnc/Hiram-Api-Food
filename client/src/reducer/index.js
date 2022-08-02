/* eslint-disable array-callback-return */

const inicialState = {
    recipes: [],
    allRecipes: [],
    //Formulario
    diets: [],
    typeDiets: [],
    detail: []
}

function roodReducer(state = inicialState, action) {
    switch (action.type) {
        
        case 'GET_RECIPES': 
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        //formulario
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }

        case 'POST_RECIPE':
            return {
                ...state,
            }

        // SearchBar
        case 'GET_NAME_RECIPES':
            return {
                ...state,
                recipes: action.payload
            }
        
        //Filtrado ascendente o descendente
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.recipes.sort(function (a,b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (b.title > a.title) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a,b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: sortedArr
            }

            
    
            case 'ORDER_BY_SCORE':
                    let sortedArr2 = action.payload === 'high' ? 
                        state.recipes.sort( function (a,b) {
                            if(a.healthScore > b.healthScore){
                                return 1;
                            }
                            if(b.healthScore > a.healthScore) {
                                return -1
                            }
                                return 0;
                        }) :
                        state.recipes.sort( function ( a, b) {
                            if(a.healthScore > b.healthScore){
                                return -1;
                            }
                            if(b.healthScore > a.healthScore){
                                return 1
                            }
                                return 0;
                        })
                    return{
                        ...state,
                        recipes: sortedArr2
                    };

        //Filtro de dietas
        case 'FILTER_BY_DIETS':
            const dietsFilter = action.payload === 'All' ? state.allRecipes :
            state.allRecipes.filter(rec => rec.diets.find(die => {
                if(die.name === action.payload) {
                    return rec
                }
            }))

            if(!dietsFilter.length > 0) {
                alert('No existen recetas de ' + action.payload)
            }
            return {
                ...state,
                recipes: dietsFilter
            }

        //Filtrado creado en db
        case 'FILTER_CREATED_IN_DB':
            let dbFilter = [];
            if( action.payload === 'All'){
                dbFilter = state.allRecipes;
                
            } else if( action.payload === 'Creada en Db'){
                dbFilter = state.allRecipes.filter( e => e.MadeInDb);

            } else if( action.payload === 'Api'){
                dbFilter = state.allRecipes.filter( e => !e.MadeInDb);
                
            }
            return{
                ...state,
                recipes: dbFilter
            }

        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }


            default: 
                return state;
        }
    }

export default roodReducer;