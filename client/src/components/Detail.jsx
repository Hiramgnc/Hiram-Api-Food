import React from 'react';
// import { Link, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';

export default function Detail(props) {
    const dispatch = useDispatch();
    // const id = useParams();

    // useEffect(() => {
    //     dispatch(getDetail(id));
    // }, [dispatch, id]);
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch, props.match.params.id]);

    const myRecipe = useSelector((state) => state.detail);

    return (
        <div>
        {
            myRecipe.length > 0 ?
                <div>
                    <h1>{myRecipe[0].title}</h1>
                    <img src={myRecipe[0].image} alt={myRecipe[0].title} />
                    <h3>{myRecipe[0].summary}</h3>
                    <p>{myRecipe[0].spoonacularScore}</p>
                    <p>{myRecipe[0].healthScore}</p>
                    <h4>{myRecipe[0].diets.map(el => el.name + (', '))}</h4>
                </div> : <div>Cargando...</div>
        }
        <Link to="/home"><button>Volver</button></Link>
        </div>
    )    
}