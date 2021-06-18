import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


const RutaPrivada = ({ component: Component, ...props  }) => {

    const autenticado = useSelector((store) => store.autenticado);

    return ( 
        <Route { ...props } render={ props   =>  !autenticado  ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />
    );
}

export default RutaPrivada;