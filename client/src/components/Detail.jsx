import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';
import styles from './Detail.module.css';

export default function Detail(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch, props.match.params.id]);

    const myRecipe = useSelector((state) => state.detail);

    return (
        <div className={styles.background}>
            {
                myRecipe.length > 0 ?
                    <div className={styles.container}>
                        <h1 className={styles.title}>{myRecipe[0].title}</h1>

                        <img className={styles.image} src={myRecipe[0].image} alt={myRecipe[0].title} />

                        <h5 className={styles.titles}>RESUMEN DEL PLATO</h5>
                        <p className={styles.text}>{myRecipe[0].summary.replace(/<[^>]*>?/g, "")}</p>

                        <h5 className={styles.titles}>PUNTAJE DE COMIDA SALUDABLE:</h5>
                        <p className={styles.txt}>{myRecipe[0].healthScore}</p>

                        <h5 className={styles.titles}>TIPO DE PLATO:</h5>
                        <p className={styles.txt}>{myRecipe[0].dishTypes ? myRecipe[0].dishTypes.map(d => d.name) :'Tipo de Plato no encontrado'}</p>

                        <h5 className={styles.titles}>PASO A PASO:</h5>
                        <p className={styles.text}>{ myRecipe[0].analyzedInstructions}</p>

                        <h5 className={styles.titles}>TIPO DE DIETA:</h5>
                        <h4 className={styles.diets}>{myRecipe[0].diets.map(el => el.name + (', '))}</h4>
                    </div> : <img src="https://i.gifer.com/ZKZg.gif" alt="loading" />
            }
            <Link to="/home"><button className={styles.button}>Volver</button></Link>
        </div>
    )    
}