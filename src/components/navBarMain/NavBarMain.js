import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import Table from '../Table'
import { getCategorias, getProductsByName, getSubcategoriasId, resetProductos } from "../Redux/actions";

import {
    Nav, Row, DropdownToggle, DropdownMenu, DropdownItem, Col, Form, FormGroup, Input, Button,
    Dropdown, Card, Collapse
} from 'reactstrap';
var geolocation = require('geolocation');








function NavBarMain({ producto, setProducto, setState }) {
    const history = useHistory()
    const categorias = useSelector(store => store.categorias);
    const productos = useSelector(store => store.productos);
    const dispatch = useDispatch();
    const nombre = localStorage.getItem("nombre");
    const [nombreFamilia, setNombreFamilia] = useState("Familias");
    const [nombreCategoria, setNombreCategoria] = useState("Categorias");
    const [nombreSubcategorias, setNombreSubcategorias] = useState("Subcategorias");
    const [categoria, setCategoria] = useState([]);
    const [subcategoria, setSubcategoria] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [dropdownOpen3, setDropdownOpen3] = useState(false);
    const [dropdownOpen4, setDropdownOpen4] = useState(false);
    const [radioBusqueda, setRadioBusqueda] = useState(false);
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(false)
    const [radio, setRadio] = useState("Radio de busqueda")
    const [radioSearch, setRadioSearch] = useState("Radio de busqueda")
    const [ubicacion, setUbicacion] = useState({
        latitud: "",
        longitud: "",
        dis: 0
    })

    const [inputSearch, setInputSearch] = useState("")

    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
    const toggle3 = () => setDropdownOpen3(!dropdownOpen3);
    const toggle4 = () => setDropdownOpen4(!dropdownOpen4);



    useEffect(() => {
        dispatch(getCategorias())
        dispatch(resetProductos())
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
            dispatch(getProductsByName(inputSearch, ubicacion));
            setInputSearch("")
            setUbicacion({
                ...ubicacion,
                dis: 0
            })
            setClick(true)
            setRadioSearch("Radio de busqueda")
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
        if (ubicacion.latitud && ubicacion.longitud) {
            if (e.target.value) {
                if (ubicacion.dis > 0) {
                    dispatch(getSubcategoriasId(e.target.value, ubicacion));
                    setCategoria([])
                    setSubcategoria([])
                    setNombreFamilia("Familias");
                    setNombreCategoria("Categorias")
                    setNombreSubcategorias("Subcategorias");
                    setClick(true);
                    setRadio("Radio de busqueda");
                    setButton(!button)
                } else {
                    swal("Debe ingresar un valor para el radio de búsqueda")
                }
            }
        }
    }



    const handleClick = (e) => {
        e.preventDefault();
        setRadioSearch(e.target.name)
        setUbicacion({
            ...ubicacion,
            dis: e.target.value
        })
    }

    const handleClickSub = (e) => {
        e.preventDefault();
        setRadio(e.target.name)
        setUbicacion({
            ...ubicacion,
            dis: e.target.value
        })
        // setClick(true)
    }

    return (
        <>
            <Card>
                <Nav className="justify-content-center" >
                    <Form inline className="ml-auto" onSubmit={e => handleSubmit(e)}>
                        <FormGroup>
                            {/* <label style={{ margin: "1% 0" , fontSize: "1em"}}>
                                Selecciona un radio de distancia
                            </label> */}
                            <Input
                                type="text"
                                placeholder="Buscar precios"
                                value={inputSearch}
                                onChange={e => setInputSearch(e.target.value)}
                            />
                            <Dropdown nav isOpen={radioBusqueda} toggle={() => setRadioBusqueda(!radioBusqueda)}>
                                <DropdownToggle nav caret>
                                    {radioSearch}
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
                        </FormGroup>
                        <Button color="secondary" size="md" style={{ marginTop: "-15px", width: "188px", height: "38px", fontSize: "10px" }}>Buscar</Button>
                    </Form>





                </Nav>
            </Card>
            <button className="btn btn-secondary btn-sm" onClick={() => {
                // console.log("1", button)
                setButton(!button)
            }}>
                Busqueda avanzada
            </button>
            <Collapse isOpen={button} >
                <Card style={{ listStyle: "none" }}>
                    <Row>
                        <Col lg="4">
                            {/* </NavItem>
                        <NavItem> */}
                            <Row>

                                <Col lg="7" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Dropdown nav>
                                        <label style={{ margin: "1% 0" }}>
                                            Selecciona un radio de distancia
                                        </label>
                                    </Dropdown>
                                </Col>

                                {/* <label disabled href="#">Selecciona un radio de distancio</label> */}
                                {/* </NavItem>
                        <NavItem> */}
                                <Col lg="5">
                                    <Dropdown nav isOpen={dropdownOpen4} toggle={toggle4}>
                                        <DropdownToggle nav caret>
                                            {radio}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem
                                                value={1000}
                                                name={"100 m"}
                                                onClick={(e) => handleClickSub(e)}
                                            >
                                                100 m
                                            </DropdownItem>
                                            <DropdownItem
                                                value={5000}
                                                name={"5 km"}
                                                onClick={(e) => handleClickSub(e)}
                                            >
                                                5 km
                                            </DropdownItem>
                                            <DropdownItem
                                                value={10000}
                                                name={"10 km"}
                                                onClick={(e) => handleClickSub(e)}
                                            >
                                                10 km
                                            </DropdownItem>
                                            <DropdownItem
                                                value={20000}
                                                name={"20 km"}
                                                onClick={(e) => handleClickSub(e)}
                                            >
                                                20 km
                                            </DropdownItem>
                                            <DropdownItem
                                                value={100000}
                                                name={"100 km"}
                                                onClick={(e) => handleClickSub(e)}
                                            >
                                                100km
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>

                            </Row>
                        </Col>
                        {/* <Nav tabs> */}

                        {/* <NavItem>
                        <NavLink disabled href="#">Busqueda avanzada</NavLink>
                    </NavItem> */}
                        <Col lg="2">
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
                        </Col>
                        {/* <NavItem> */}
                        <Col lg="3">
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
                        </Col>
                        {/* </NavItem>
                        <NavItem> */}
                        <Col lg="3">
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
                        </Col>

                        {/* </NavItem> */}

                        {/* </Nav> */}
                    </Row>
                </Card>
            </Collapse>



            <Card>
                {
                    !ubicacion.latitud && !ubicacion.longitud ?
                        <div className="containerMessageBack">
                            No hemos podido acceder a tu ubicación
                            <Button onClick={() => history.push("/cazador")}>Recargar</Button>
                        </div>
                        : click ?
                            productos.length === 0 ?
                                <div className="containerMessageBack">No se encontraron precios para esta subcategoria</div> :
                                <Table productos={productos} ubicacion={ubicacion} />
                            : null
                }
            </Card>


        </>
    )
}


export default NavBarMain;







