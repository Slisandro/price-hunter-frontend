import React,{ useSelector} from 'react';
import "./Aside.css";
import { cerrarSesion} from '../../Redux/actions';
import { useDispatch } from 'react-redux';




const Aside= (props) => {
    
  
    const dispatch = useDispatch();
  

 


    return ( 
        <div id="aside" className="asideTableroUser">
            <div className="account-profile">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Lionel_Messi_20180626_%28cropped%29.jpg" alt=""/>
                <div className="blob-wrap">
                    <div className="blob"></div>
                    <div className="blob"></div>
                    <div className="blob"></div>
                </div>
                <div className="account-name">Nombre usuario</div>
                <button className="account-title" onClick={ () => dispatch(cerrarSesion())} >Cerrar Sesion</button>
            </div>

            <div className="account cardAside card1">
                <div className="user-card">Tienes 8678 hunterCoins</div>
                <div className="user-income">Precios cazados: 25</div>
                <p className="user-info">*********************</p>
            </div>
        


            <div className="account card">
               
            </div>

        </div>
     );
}
 
export default Aside