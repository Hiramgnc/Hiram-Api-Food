import React from 'react';
import styles from './Card.module.css';

export default function Card({title, diets,image}) {
    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <img className={styles.imgBox} src={image ? image :'https://th.bing.com/th/id/R.bd90c39e1235f68b88affffa2bf55fe4?rik=38DZcpZjUEDV5w&pid=ImgRaw&r=0'} alt='Img not found'/>
                <div className={styles.contentBox}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.diet}>Diets: {diets}</p>
                </div>
            </div>
        </div>
    )
}