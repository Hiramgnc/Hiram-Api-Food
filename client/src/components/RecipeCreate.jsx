import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipeCreate.module.css';

function validate(input) {
    let errors = {};

    if(!input.title) {
    errors.title= 'Debe ingresar el nombre de la Receta'
    } else if 
    (!input.summary) {
        errors.summary= 'Debe ingresar el resumen de la Receta'
    } else if (!input.spoonacularScore<0 || input.spoonacularScore>100){
        errors.spoonacularScore= 'El puntaje asignado debe estar entre 0 y 100'
    } else if(!input.analyzedInstructions) {
        errors.analyzedInstructions= 'Debe ingresar los pasos de la Receta'
    } else if (!input.healthScore<0 || input.healthScore>100) {
        errors.healthScore= 'El puntaje asignado debe estar entre 0 y 100'
    } 
    
    return errors
}

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const dietType = useSelector((state) => state.diets);
    const history = useHistory();
    // const [errors, setErrors] = useState({});
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        title: "",
        // image: "",
        summary: "",
        spoonacularScore: 0,
        analyzedInstructions: "",
        healthScore: 0,    
        diets : []
    })

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch])

    function handleChange (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSelect (e) {
        setInput ({
            ...input,
            diets: [...input.diets, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
    }

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(postRecipe(input));
        alert("Receta creada!")
        setInput({
            title: "",
            image: "",
            summary: "",
            spoonacularScore: 0,
            analyzedInstructions: "",
            healthScore: 0,
            diets: []
        })
        history.push('/home')
    }

    function handleDelete (e) {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== e)
        })
    }


    return (
        <div>
            <Link to="/home"><button className={styles.btnVol}>Volver</button></Link>

            <form className={styles.container} onSubmit={(e) => handleSubmit(e)} >
                <h1>Crea tu receta</h1>

                <div className={styles.box}>
                    <label>Nombre de la receta:</label>
                    <input type='text' name='title' value={input.title} onChange={(e)=>handleChange(e)}/>
                    {/* {errors.name && <p> {errors.title}</p>} */}
                    { errors.title && (<p>{errors.title}</p>)}
                </div>

                <div className={styles.box}>
                    <label>Imagen de la receta:</label>
                    <input type="text" value={input.image} name="image" onChange={(e) =>handleChange(e)} />
                </div>

                <div className={styles.box}>
                    <label>Resumen de la receta:</label>
                    <input type="text" value={input.summary} name="summary" onChange={(e) =>handleChange(e)} />
                    {errors.summary && <p> {errors.summary}</p>}
                </div>

                <div className={styles.box}>
                    <label>Nivel de comida saludable:</label>
                    <input type="number" value={input.spoonacularScore} name="spoonacularScore" onChange={(e) =>handleChange(e)} />
                    {errors.spoonacularScore && <p> {errors.spoonacularScore}</p>}
                </div>

                <div className={styles.box}>
                    <label>Instrucciones de la receta:</label>
                    <input type="text" value={input.analyzedInstructions} name="analyzedInstructions" onChange={(e) =>handleChange(e)} />
                    {errors.analyzedInstructions && <p> {errors.analyzedInstructions}</p>}
                </div>

                <div className={styles.box}>
                    <label>Puntaje de la receta:</label>
                    <input type="number" value={input.healthScore} name="healthScore" onChange={(e) =>handleChange(e)} />
                    {errors.healthScore && <p> {errors.healthScore}</p>}
                </div>

                <select onChange={(e) => handleSelect(e)}>
                <option>Seleccione el tipo de Dieta</option>
                    {dietType?.map((d) => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                ))}
                </select>
                {errors.diets && <p> {errors.diets}</p>}
                <ul>
                    <li>{input.diets.map(e => e + " ,")}</li>
                </ul>

                <button className={styles.btnCr} type="submit">Crear receta</button>
            </form>
            {input.diets.map(e =>
                <div>
                    <p>{e}</p>
                    <button onClick={() => handleDelete(e)}>X</button>
                </div>)}
            
        </div>
    )
}