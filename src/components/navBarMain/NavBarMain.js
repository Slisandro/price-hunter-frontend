import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import Categorias from '../categorias/Categorias';
import swal from 'sweetalert';
import { getCategorias, getProductsByName } from "../Redux/actions";

import {
    Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledButtonDropdown, Form, FormGroup, Input, Button,
    Dropdown, Card, Collapse
} from 'reactstrap';


var geolocation = require('geolocation');








function NavBarMain({ producto, setProducto, setState }) {
    const categorias = useSelector(store => store.categorias);
    const dispatch = useDispatch();
    // const nombre = localStorage.getItem("nombre");
    // const [error, setError] = useState(false) // Borde al select cuando no ha sido seleccionado
    const [nombreFamilia, setNombreFamilia] = useState("Familias");
    const [nombreCategoria, setNombreCategoria] = useState("Categorias");
    const [nombreSubcategorias, setNombreSubcategorias] = useState("Subcategorias");
    const [categoria, setCategoria] = useState([]);
    const [subcategoria, setSubcategoria] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [dropdownOpen3, setDropdownOpen3] = useState(false);
    const [dropdownOpen4, setDropdownOpen4] = useState(false);
    const [radio, setRadio] = useState("Radio de busqueda")
    const [ubicacion, setUbicacion] = useState({
        latitud: "",
        longitud: "",
        dis: 0
    })

    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
    const toggle3 = () => setDropdownOpen3(!dropdownOpen3);
    const toggle4 = () => setDropdownOpen4(!dropdownOpen4);



    useEffect(() => {
        dispatch(getCategorias())
        geolocation.getCurrentPosition((err, position) => {
            if (err) throw err
            return setUbicacion({
                ...ubicacion,
                longitud: position.coords.longitude + "",
                latitud: position.coords.latitude + "",
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])






    const handleSubmit = (e) => {
        e.preventDefault();
        if (ubicacion.longitud && ubicacion.latitud) {
            dispatch(getProductsByName(producto, ubicacion));
            setState("Search");
            setProducto("")
            setUbicacion({
                ...ubicacion,
            })
        } else {
            swal("No hemos podido acceder a su ubicación", " ", "error");
        }
    }

    const handleCategorias = (e) => {
        const idFamilia = e.target.value;
        setNombreFamilia(e.target.name)
        const arrayCategorias = [];

        if (idFamilia) {
            for (let i = 0; i < categorias.length; i++) {
                if (categorias[i].id === parseInt(idFamilia)) {
                    for (let j = 0; j < categorias[i].categoria.length; j++) {
                        arrayCategorias.push(
                            {
                                idCategoria: categorias[i].categoria[j].id,
                                nombreCategoria: categorias[i].categoria[j].nombre_categoria,
                                subcategorias: categorias[i].categoria[j].subcategoria
                            }
                        )
                    }
                }
            }
        } else {
            setSubcategoria([]);
        }
        return setCategoria(arrayCategorias);
    }

    const handleSubcategorias = (e) => {
        const idCategoria = e.target.value;
        setNombreCategoria(e.target.name)
        const arraySubcategorias = [];
        if (idCategoria) {
            for (let i = 0; i < categoria.length; i++) {
                if (categoria[i].idCategoria === parseInt(idCategoria)) {
                    for (let j = 0; j < categoria[i].subcategorias.length; j++) {
                        arraySubcategorias.push(
                            {
                                idSubcategoria: categoria[i].subcategorias[j].id,
                                nombreSubcategoria: categoria[i].subcategorias[j].nombre_subcategoria
                            }
                        )
                    }
                }
            }
        }
        return setSubcategoria(arraySubcategorias);
    }

    const handleClickSubCategoria = (e) => {
        setNombreSubcategorias(e.target.name);
        e.preventDefault();
        // if (ubicacion.latitud && ubicacion.longitud) {
        //     if (e.target.value) {
        //         if (ubicacion.dis > 0) {
        //             setState("Search");
        //             //   dispatch(getSubcategoriasId(e.target.value, ubicacion));
        //             setCategoria([])
        //             setSubcategoria([])
        //             document.getElementsByName("familia")[0].value = null
        //             // nombreFamilia.value = ""
        //         } else {
        //             swal("Debe ingresar un valor para el radio de búsqueda")
        //         }
        //     } else {
        //         swal("No hemos podido acceder a su ubicación", " ", "error");
        //     }
        // }
    }



    const handleClick = (e) => {
        e.preventDefault();
        setRadio(e.target.name)
        setUbicacion({
            ...ubicacion,
            dis: e.target.value
        })
    }

    const handleChange = (e) => {
        setProducto(e.target.value)
    }


    const [isOpen, setIsOpen] = useState(false);

    const toggleSearch = () => setIsOpen(!isOpen);

    return (
        <>


            <div>

                <Card>
                    <Nav className="justify-content-center" >
                        <Form inline className="ml-auto">
                            <FormGroup>
                                <Input type="text" placeholder="Search" />

                            </FormGroup>
                            <Button color="secondary" size="md" style={{ marginTop: "-15px", width: "188px", height: "38px", fontSize: "10px" }}>Buscar</Button>
                        </Form>
                    </Nav>
                </Card>

                <Button color="secondary" onClick={toggleSearch} style={{ marginBottom: '1rem' }}>Busqueda avanzada</Button>
                <Collapse isOpen={isOpen}>

                    <Card>
                        {/* <h3 style={{ color: "rgba(96, 214, 0, 0.959)" }}>Busqueda avanzada</h3> */}
                        <Nav className="justify-content-center" >
                            <NavItem>
                                <NavLink disabled href="#">Selecciona un radio de distancia</NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown nav isOpen={dropdownOpen4} toggle={toggle4}>
                                    <DropdownToggle nav caret>
                                        {radio}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem
                                            value={1000}
                                            name={"100 m"}
                                            onClick={(e) => handleClick(e)}
                                        >
                                            100 m
                                        </DropdownItem>
                                        <DropdownItem
                                            value={5000}
                                            name={"5 km"}
                                            onClick={(e) => handleClick(e)}
                                        >
                                            5 km
                                        </DropdownItem>
                                        <DropdownItem
                                            value={10000}
                                            name={"10 km"}
                                            onClick={(e) => handleClick(e)}
                                        >
                                            10 km
                                        </DropdownItem>
                                        <DropdownItem
                                            value={20000}
                                            name={"20 km"}
                                            onClick={(e) => handleClick(e)}
                                        >
                                            20 km
                                        </DropdownItem>
                                        <DropdownItem
                                            value={100000}
                                            name={"100 km"}
                                            onClick={(e) => handleClick(e)}
                                        >
                                            100km
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </NavItem>





                            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle nav caret>
                                    {nombreFamilia}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {
                                        categorias.length &&
                                        categorias.map(familia => {
                                            return (
                                                <DropdownItem key={familia.id} value={familia.id} name={familia.nombre_familia} onClick={(e) => handleCategorias(e)}>{familia.nombre_familia}</DropdownItem>
                                            )
                                        })
                                    }
                                </DropdownMenu>
                            </Dropdown>
                            <NavItem>
                                <Dropdown nav isOpen={dropdownOpen2} toggle={toggle2}>
                                    <DropdownToggle nav caret>
                                        {nombreCategoria}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            categoria.length === 0 ? null : (
                                                categoria.map(cat => {
                                                    return (
                                                        <DropdownItem
                                                            key={cat.idCategoria}
                                                            value={cat.idCategoria}
                                                            name={cat.nombreCategoria}
                                                            onClick={(e) => handleSubcategorias(e)}
                                                        >
                                                            {cat.nombreCategoria}
                                                        </DropdownItem>
                                                    )
                                                })
                                            )
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                <Dropdown nav isOpen={dropdownOpen3} toggle={toggle3}>
                                    <DropdownToggle nav caret>
                                        {nombreSubcategorias}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            ubicacion.dis === 0 ?
                                                <label>Debe seleccionar distancia</label> : (
                                                    subcategoria && categoria &&
                                                    subcategoria.map((sub) => {
                                                        return (
                                                            <DropdownItem
                                                                key={sub.idSubcategoria}
                                                                value={sub.idSubcategoria}
                                                                name={sub.nombreSubcategoria}
                                                                onClick={e => handleClickSubCategoria(e)}
                                                            >
                                                                {sub.nombreSubcategoria}
                                                            </DropdownItem>
                                                        )
                                                    }
                                                    ))
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>



                        </Nav>
                    </Card>
                </Collapse>
            </div>

        </>
    )
}


export default NavBarMain;














// {/* Animation */ }
// <div id="container-welcome">
//     <div className="discount-chart">
//         <div className="circle">
//             <div className="pie">
//                 <svg>
//                     <circle cx="60" cy="60" r="50"></circle>
//                 </svg>
//             </div>
//             <div className="counter"> $ </div>
//         </div>
//     </div>

//     <div className="main_welcome">
//         <h1>Bienvenido, <span className="hunter" id="nameUser">{nombre}</span></h1>
//         <p>Administra aquí tus precios</p>
//     </div>
// </div>





// {/* Categories */ }
// {/* <Categorias ubicacion={ubicacion} categorias={categorias} setState={setState} /> */ }
// {/* SearchBar */ }



// <form className="formSearchUser" onSubmit={handleSubmit}>
//     <div className="containerInputSearch">
//         <input
//             id="inputSearchBarText"
//             type="text"
//             className="input__text"
//             placeholder="Buscar precios cercanos"
//             onChange={handleChange}
//             value={producto}
//             name={producto}
//         />
//         <input type="submit" id="inputSearchBarSubmit" className="btn__main" value="Buscar" />
//     </div>
//     <Categorias ubicacion={ubicacion} categorias={categorias} setState={setState} />
//     <select onClick={e => handleClick(e)} id="selectSearchBarUser">
//         <option></option>
//         <option value={100}>100 m</option>
//         <option value={1000}>1 km</option>
//         <option value={5000}>5 km</option>
//         <option value={10000}>10 km</option>
//         <option value={20000}>20 km</option>
//         <option value={100000}>100 km</option>
//     </select>
// </form>


