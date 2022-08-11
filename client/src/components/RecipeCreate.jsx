import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipeCreate.module.css';


function validate(input) {
    let errors = {};

    if (!input.title  || /[@!#$%&/0-9]/g.test(input.title)) {
        errors.title  = "Se requiere un nombre válido (no debe tener símbolos o números).";
    } 
        else if (!input.image || /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(input.image)) {
        errors.image = "Se requiere una imagen de una dirección URL";
    }  
        else if (!input.summary) {
        errors.summary = "Se requiere un resumen";
    } 
        else if (input.healthScore > 100  || input.healthScore <= 0) {
        errors.healthScore = "La puntuación de salud tiene que ser mayor que 0 e inferior 100.";
        if(!input.healthScore < 0 || input.healthScore > 100) errors.healthScore= "El puntaje asignado debe estar entre 0 y 100.";
    } 
        else if (!input.analyzedInstructions) {
        errors.analyzedInstructions = "Los pasos son obligatorios.";
    } 
        else if (input.diets.length === 0) {
        errors.diets = "Selecciona al menos un tipo de dieta.";
    }

    return errors;
}


export default function RecipeCreate() {
    const dispatch = useDispatch();
    const dietType = useSelector((state) => state.diets);
    const history = useHistory();

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        title: "",
        image: "",
        summary: "",
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
        if (input.title && input.summary && input.healthScore && input.analyzedInstructions && input.diets.length && !Object.keys(errors).length) {
            e.preventDefault();
            dispatch(postRecipe(input));
            alert("Receta creada!")
            history.push('/home')

            setInput({
                title: "",
                image: "",
                summary: "",
                analyzedInstructions: "",
                healthScore: 0,
                diets: []
            })
            
        } else {
            alert("Debe completar el formulario!")
        }
    }

    function handleDelete (e) {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== e)
        })
    }


    return (
        <div className={styles.background}>
            
            <h1 className={styles.title}>Crea tu receta</h1>
            <form className={styles.container} onSubmit={(e) => handleSubmit(e)} >

            <Link to="/home"><button className={styles.btnVol}>Volver</button></Link>

                <div className={styles.box}>
                    <label>Nombre de la receta:</label>
                    <input type='text' name='title' value={input.title} onChange={(e)=>handleChange(e)}/>
                    { errors.title && (<p className={styles.err}>{errors.title}</p>)}
                </div>

                <div className={styles.box}>
                    <label>Imagen de la receta:</label>
                    <input type="text" value={input.image} name="image" onChange={(e) =>handleChange(e)} />
                </div>

                <div className={styles.box}>
                    <label>Resumen de la receta:</label>
                    <input type="text" value={input.summary} name="summary" onChange={(e) =>handleChange(e)} />
                    {errors.summary && <p className={styles.err}> {errors.summary}</p>}
                </div>

                <div className={styles.box}>
                    <label>Nivel de comida saludable:</label>
                    <input type="number" value={input.healthScore} name="healthScore" onChange={(e) =>handleChange(e)} />
                    {errors.healthScore && <p className={styles.err}> {errors.healthScore}</p>}
                </div>

                <div className={styles.box}>
                    <label>Paso a Paso:</label>
                    <input type="text" value={input.analyzedInstructions} name="analyzedInstructions" onChange={(e) =>handleChange(e)} />
                    {errors.analyzedInstructions && <p className={styles.err}> {errors.analyzedInstructions}</p>}
                </div>

                <select className={styles.select} onChange={(e) => handleSelect(e)}>
                <option>Seleccione el tipo de Dieta</option>
                    {dietType?.map((d) => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                ))}
                </select>
                {errors.diets && <p className={styles.err}> {errors.diets}</p>}
                <ul>
                    <li>{input.diets.map(e => e + " ,")}</li>
                </ul>

                {/* <button className={styles.btnCrear} type="submit">Crear receta</button> */}
                { 
                    Object.keys(errors).length ? 
                        <button className={styles.btnCrear} type='submit' disabled >Crear receta</button> :
                        <button className={styles.btnCrear} type='submit'>Crear receta</button> 
                }

            </form>

            {input.diets.map(e =>
                <div className={styles.containerDelete}>
                    <p className={styles.dietDelete}>{e}</p>
                    <button className={styles.buttonDelete} onClick={() => handleDelete(e)}>X</button>
                </div>)}
            
        </div>
    )
}