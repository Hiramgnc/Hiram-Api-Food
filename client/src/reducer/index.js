
const inicialState = {
    recipes: [],
    allRecipes: [],
    //Formulario
    diets: [],
    
    typeDiets: []

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

        //Dietas
        // case 'FILTER_BY_DIETS':
        //     const allRecipe = state.allRecipes;
        //     const dietsFilter = action.payload === 'all' ? allRecipe : 
        //     allRecipe.filter(e => e.status === action.payload);

        //     return {
        //         ...state,
        //         recipes: dietsFilter
        //     }
        case "FILTER_BY_DIETS":
            const allRecipe = state.allRecipes;
            const dietsFilter = action.payload === "all" ? allRecipe : 
            allRecipe.filter((el) => el.typeDiets.find((e) => e.name === action.payload)
                );console.log(dietsFilter)

            return {
                ...state,
                recipes: dietsFilter,
            };

            default: 
                return state;
        }
    }

export default roodReducer;