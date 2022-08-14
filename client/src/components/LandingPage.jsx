import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';


export default function LandingPage() {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.container2}>
                    <p className={styles.title}> &mdash; Encontra &mdash;
                        <span className={styles.span}>
                            recetas saludables
                        </span>
                            &mdash; para vos &mdash;
                    </p>
                    <Link to='/home'>
                        <button className={styles.button}>INGRESAR</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}