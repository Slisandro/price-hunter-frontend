import React from 'react';
import "./Aside.css";



const Aside= () => {

    return ( 
        <div id="aside">
            <div className="account-profile">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Lionel_Messi_20180626_%28cropped%29.jpg" alt=""/>
                <div className="blob-wrap">
                    <div className="blob"></div>
                    <div className="blob"></div>
                    <div className="blob"></div>
                </div>
                <div className="account-name">Nombre usuario</div>
                <div className="account-title">Cerrar Sesion</div>
            </div>

            <div class="account card card1">
                <div class="user-card">Tienes 8678 hunterCoins</div>
                <div class="user-income">Precios cazados: 25</div>
                <p class="user-info">*********************</p>
            </div>
        


            <div class="account card">
               
            </div>

        </div>
     );
}
 
export default Aside