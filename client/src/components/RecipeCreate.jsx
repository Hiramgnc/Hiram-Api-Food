import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipeCreate.module.css';


function validate(input) {
    let errors = {};

    let regexTitle = /^[a-zA-ZÀ-ÿ\s]{3,80}$/;
    let regexHealthScore = /^\b([0-9]|[1-9][0-9]|100)\b$/gm;

    if (!input.title.trim()) {
        errors.title = "Se requiere el nombre de la receta";
    } else if (!regexTitle.test(input.title.trim())) {
        errors.title = "El nombre solo acepta letras y espacios en blanco";
    }

    if (input.summary === "") errors.summary = 'Se requiere un resumen';

    if (!input.summary.trim()) {
        errors.healthScore = "Se requiere un puntaje de salud";
    } else if (!regexHealthScore.test(input.healthScore.trim())) {
        errors.healthScore = "Solo acepta enteros positivos";
    } else if (parseInt(input.healthScore.trim()) < 1 || (input.healthScore.trim()) > 100 ) {
        errors.healthScore = "La puntuación de salud tiene que ser mayor que 0 e inferior 100";
    }

    if (!input.analyzedInstructions) {
        errors.analyzedInstructions = "El paso a paso es obligatorio";
    } 

    if (!input.diets.length === 0) {
        errors.diets = "Seleccione al menos un tipo de dieta";
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
        healthScore: "",    
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


    function handleSelect(e) {
        e.preventDefault()
        if(!input.diets.includes(e.target.value) && e.target.value !== 'vacio') {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
        e.target.value = 'vacio'
        setErrors(                          
            validate({
                ...input,
                [e.target.name]: e.target.value,  
            })
        );
    }

    const handleBlur = (e) => {
        //Aqui es donde se haran las validaciones y este mismo las lance
        handleChange(e);
        setErrors(validate(input)); 
        // la funcion validate va a funcionar dentro de la variable de estado de los errores y 
        //validara las variables del formulario
    };


    function handleDelete (e) {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== e)
        })
    }
    



    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(input));
        if (Object.keys(errors).length === 0) {
            dispatch(postRecipe(input));
            alert("Receta creada con exito");
            setInput({
                title: "",
                image: "",
                summary: "",
                analyzedInstructions: "",
                healthScore: "",
                diets: []
            })
            history.push('/home')
        } else {
        alert("Complete los campos requeridos");
        }
    };



    return (
        <div className={styles.background}>
            
            <h1 className={styles.title}>Crea tu receta</h1>
            <form className={styles.container} onSubmit={(e) => handleSubmit(e)} >

            <Link to="/home"><button className={styles.btnVol}>Volver</button></Link>

                <div className={styles.box}>
                    <label>Nombre de la receta:</label>
                    <input 
                        type='text' 
                        value={input.title} 
                        name="title"
                        onBlur={(e) => handleBlur(e)}
                        onChange={(e)=>handleChange(e)}/>
                    { errors.title && (<p className={styles.err}>{errors.title}</p>)}
                </div>

                <div className={styles.box}>
                    <label>Imagen de la receta:</label>
                    <input 
                        type="text" 
                        value={input.image} 
                        name="image" 
                        onChange={(e) =>handleChange(e)} />
                </div>

                <div className={styles.box}>
                    <label>Resumen de la receta:</label>
                    <input 
                        type="text" 
                        value={input.summary} 
                        name="summary" 
                        onBlur={(e) => handleBlur(e)}
                        onChange={(e) =>handleChange(e)} />
                    {errors.summary && <p className={styles.err}> {errors.summary}</p>}
                </div>

                <div className={styles.box}>
                    <label>Nivel de comida saludable:</label>
                    <input 
                        type="number" 
                        value={input.healthScore} 
                        name="healthScore" 
                        onBlur={(e) => handleBlur(e)}
                        onChange={(e) =>handleChange(e)} />
                    {errors.healthScore && <p className={styles.err}> {errors.healthScore}</p>}
                </div>

                <div className={styles.box}>
                    <label>Paso a Paso:</label>
                    <input 
                        type="text" 
                        value={input.analyzedInstructions} 
                        name="analyzedInstructions" 
                        onBlur={(e) => handleBlur(e)}
                        onChange={(e) =>handleChange(e)} />
                    {errors.analyzedInstructions && <p className={styles.err}> {errors.analyzedInstructions}</p>}
                </div>

                <select 
                    className={styles.select} 
                    onBlur={(e) => handleBlur(e)}
                    onChange={(e) => handleSelect(e)}>
                <option hidden selected value='vacio'>Seleccione el tipo de Dieta</option>
                    {dietType?.map((d) => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                ))}
                </select>
                {errors.diets && <p className={styles.err}> {errors.diets}</p>}
                <ul>
                    <li>{input.diets.map(e => e + " ,")}</li>
                </ul>

                {input.diets.map(e =>
                <div className={styles.containerDelete}>
                    <p className={styles.dietDelete}>{e}</p>
                    <button className={styles.buttonDelete} onClick={() => handleDelete(e)}>X</button>
                </div>)}

                <button 
                    className={styles.btnCrear} 
                    type="submit" 
                    onClick={(e) => handleSubmit(e)}>Crear receta
                </button>

            </form>
    
        </div>
    )
}