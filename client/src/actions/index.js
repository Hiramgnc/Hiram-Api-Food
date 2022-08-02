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

//formulario
export function getDiets () {
    return async function (dispatch) {
        let info = await axios.get("http://localhost:3001/diet", {

        });
        return dispatch({
            type: 'GET_DIETS',
            payload: info.data
        });
    }
}

export function postRecipe (payload) {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/recipe", payload);
        return response;
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

//Filtrado dietas
export function filterByDiets(payload){
    return {
        type: 'FILTER_BY_DIETS',
        payload
    }
}

//Filtrado creado en db
export function filterCreatedInDb(payload){
    return{
        type: 'FILTER_CREATED_IN_DB',
        payload
    }
}

export function getDetail (id) {
    return async function(dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/recipe/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

