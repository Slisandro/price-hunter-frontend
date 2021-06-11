export const GET_PRODUCTS_NAME  = "GET_PRODUCTS_NAME";
export const LOADING = "LOADING";




//PARA TRAER TODoS Los productos
export function getAllProductsByName() {     
    return function(dispatch) { 
        let api = "http://localhost:3001";                         
        return fetch(api)  
        .then(response => response.json())                               
        .then(json => {                                                   
            dispatch({ 
                type: GET_PRODUCTS_NAME ,
                payload: json 
            });
        });
    
    }
};

