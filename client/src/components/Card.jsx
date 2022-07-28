import React from 'react';

// export default function Card(name, image, diets) {
//     return (
//         <div>
//             <h3>{name}</h3>
//             {diets.map((e, index) => <h5 key={index}>{e.name}</h5>)}
//             <img src={image ? image :'https://th.bing.com/th/id/R.bd90c39e1235f68b88affffa2bf55fe4?rik=38DZcpZjUEDV5w&pid=ImgRaw&r=0'} alt='Img not found'/>
//         </div>
//     )
// }




function Card({title, diets,image}) {
    return (
        <div>
        {/* <img src={image} alt="Img not found"/> */}
        <img src={image ? image :'https://th.bing.com/th/id/R.bd90c39e1235f68b88affffa2bf55fe4?rik=38DZcpZjUEDV5w&pid=ImgRaw&r=0'} alt='Img not found'/>
        <div>
        <h2>{title}</h2>
        <p>Diets: {diets}</p>
        </div>
    </div>
    )}

export default Card;