import React from "react";
import style from "./Paginate.module.css";

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i ++) {
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className={style.ul}>
                {pageNumbers.map(number => (
                    <li className={style.li} key={number}>
                        <button className={style.button} onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

