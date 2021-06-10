import "./Slider.css";
import Pic1 from '../assets/img/slider/slider1.png';
import Pic2 from '../assets/img/slider/slider2.png';
import Pic3 from '../assets/img/slider/slider3.png';

function SliderHP() {
    return (
        <div className="slider">
            <ul>
                <li>
                    <div className="containerSlider">
                        <div className="data">
                            <h2 className="titleNavBar">PRICE HUNTER</h2>
                            <p className="description">Consiga grandes recompensas por cumplir con tareas gracias a nuestras empresas asociadas</p>
                            <div className="buttons">
                                <button>Saber más</button>
                                <button>Unirte</button>
                            </div>
                        </div>
                        <img
                            alt=""
                            src={Pic1}
                        />
                    </div>
                </li>
                <li>
                    <div className="containerSlider">
                        <div className="data">
                            <h2 className="title">PRICE REWARD</h2>
                            <p className="description">Consiga las mejores ofertas en su zona en miles de productos gracias a nuestros price hunters</p>
                            <div className="buttons">
                                <button>Saber más</button>
                                <button>Unirte</button>
                            </div>
                        </div>
                        <img
                            alt=""
                            src={Pic2}
                        />
                    </div>
                </li>
                <li>
                    <div className="containerSlider">
                        <div className="data">
                            <h2 className="title">EMPRESAS</h2>
                            <p className="description">Consiga una recopilación de datos adaptable a sus intereses para su empresa</p>
                            <div className="buttons">
                                <button>Saber más</button>
                                <button>Unirte</button>
                            </div>
                        </div>
                        <img
                            alt=""
                            src={Pic3}
                        />
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default SliderHP;