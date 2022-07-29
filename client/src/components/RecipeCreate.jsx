import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const dietType = useSelector(state => state.diets);
    const history = useHistory();

    const [input, setInput] = useState({
        title: "",
        image: "",
        summary: "",
        spoonacularScore: 0,
        analyzedInstructions: "",
        healthScore: 0,    
        diets : []
    })

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
    }

    function handleSubmit (e) {
        e.preventDefault();
        console.log(input)
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

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch])

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea tu receta</h1>

            <form onSubmit={(e) => handleSubmit(e)} >

                <div>
                    <label>Nombre de la receta:</label>
                    <input type='text' name='title' value={input.title} onChange={(e)=>handleChange(e)}/>
                </div>

                <div>
                    <label>Imagen de la receta:</label>
                    <input type="text" value={input.image} name="image" onChange={(e) =>handleChange(e)} />
                </div>

                <div>
                    <label>Resumen de la receta:</label>
                    <input type="text" value={input.summary} name="summary" onChange={(e) =>handleChange(e)} />
                </div>

                <div>
                    <label>Nivel de comida saludable:</label>
                    <input type="number" value={input.spoonacularScore} name="spoonacularScore" onChange={(e) =>handleChange(e)} />
                </div>

                <div>
                    <label>Instrucciones de la receta:</label>
                    <input type="text" value={input.analyzedInstructions} name="analyzedInstructions" onChange={(e) =>handleChange(e)} />
                </div>

                <div>
                    <label>Puntaje de la receta:</label>
                    <input type="number" value={input.healthScore} name="healthScore" onChange={(e) =>handleChange(e)} />
                </div>

                <select onChange={(e) => handleSelect(e)}>
                <option>Seleccione el tipo de Dieta</option>
                    {dietType?.map((d) => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                ))}
                </select>
                <ul>
                    <li>{input.diets.map(e => e + " ,")}</li>
                </ul>

                <button type="submit">Crear receta</button>

            </form>
            
        </div>
    )
}