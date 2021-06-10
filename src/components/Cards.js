import React from 'react';
import Card from './Card';

import './Cards.css'

function Cards ({productos}) {
    return (
        <div className="cards">
            {productos.map(prod => {
            return <Card props={prod}/>
            })}
        </div>
    )
}

export default Cards;