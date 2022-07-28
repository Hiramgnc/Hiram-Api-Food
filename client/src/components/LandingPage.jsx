import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';


export default function LandingPage() {
    return (
        <div className={styles.background}>
                <p className={styles.title}> &mdash; Encontra &mdash;
                    <span className={styles.span}>
                        recetas ideales
                    </span>
                        &mdash; para vos &mdash;
                </p>
                <Link to='/home'>
                    <button className={styles.button}>INGRESAR</button>
                </Link>
        </div>
    )
}