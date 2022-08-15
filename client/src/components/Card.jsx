import React from 'react';
import styles from './Card.module.css';

export default function Card({title, diets,image}) {
    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <img className={styles.imgBox} 
                src={image ? image :'https://i.postimg.cc/VLcD9zKM/Pordefecto.jpg'} alt='Imagen no disponible'/>
                <div className={styles.contentBox}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.diet}>Diets: {diets}</p>
                </div>
                <a className ={styles.link} href={`recipe/${title.id}`}>Ver Detalle</a>
            </div>
        </div>
    )
}