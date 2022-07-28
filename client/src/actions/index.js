import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/recipe');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

//SearchBar
export function getNameRecipes (title) {
    return async function (dispatch) {
        try {
            let json = await axios.get( `http://localhost:3001/recipe?name=${title}`);
            return dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
        } catch (error) {
            alert('No se encontraron resultados');

            return error
        }
    }
}


//Ordenamiento ascendente o descendente
export function orderByName (payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

//Ordenamiento nivel de comida saludable
export function orderByScore (payload) {
    return {
        type: 'ORDER_BY_SCORE',
        payload
    }
}

//Dietas
export function filterByDiets(payload){
    return {
        type: 'FILTER_BY_DIETS',
        payload
    }
}

