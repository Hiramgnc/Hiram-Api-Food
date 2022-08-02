/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, orderByName, orderByScore, filterByDiets, filterCreatedInDb } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginate from './Paginate';
import SearchBar from './SearchBar';
import styles from './Home.module.css';

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);
    //filtrado
    const[orden, setOrden] = useState('');
    
    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    //Ordenamiento acendente o descendente
    function handleSortName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    //Ordenamiento por nivel de comida saludable
    function handleSortScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    //Filtrado por dietas
    function handleFilterDiet(e) {
        dispatch(filterByDiets(e.target.value))
        setOrden(`ordenado ${e.target.value}`);
        setCurrentPage(1);
    }

    //Filtrado por creados en Db
    function handleFilterCreatedInDb(e) {
        dispatch(filterCreatedInDb(e.target.value))
        setOrden(`ordenado ${e.target.value}`);
        setCurrentPage(1);
    }

    return (
        <div className={styles.background}>
            <Link to="/recipe"><button>Crear receta</button></Link>

            <h1>Hiram Food Api</h1>
            <button onClick = {e => {handleClick(e)}}>
                Volver a Recetas
            </button>

            {/* Filtros */}
            <div>

                {/* Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético */}
                <select onChange={e => handleSortName(e)}>
                    <option value="vacio">Ordenar</option>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>

                {/* Opciones para ordenar por health score (nivel de comida saludable) */}
                <select onChange={e => handleSortScore(e)}>
                    <option value="vacio">Puntuación</option>
                    <option value="high"> Más alta </option>
                    <option value="low"> Más baja </option>
                </select>

                {/* Opciones para filtrar por por tipo de dieta */}
                <select onChange={e => handleFilterDiet(e)}>
                    <option value="all">Tipo de dieta</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="dairy free">Dairy free</option>
                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="fodmap friendly">Fodmap friendly</option>
                    <option value="vegetarian">Vegetarian</option>
                </select>

                <select onChange={(e)=>{handleFilterCreatedInDb(e)}}>
                    <option value="All">Todas las recetas</option>
                    <option value="Creada en Db">Creadas</option>
                    <option value="Api">Existentes</option>
                </select>

                <Paginate
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginate={paginate}
                />

                <SearchBar />

                <div>
                {
                    currentRecipes?.map((e) => {
                        return (
                            <Link to={ `/home/` + e.id } >
                                <Card
                                    title={e.title}
                                    diets={e.diets.map(recipe => (<p >{recipe.name}</p>))}
                                    image={e.image}
                                    key={e.id}
                                />
                            </Link>
                        )
                    }) 
                }

                </div>    
            </div>
        </div>
    )
}

//image={e.image ? e.image : <img src="url de imagen"/>}