import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {getMisDesafios} from "../../../Redux/actions";
import "./misdesafios.css"
import Desafio from "./desafio/desafio";
import Select from 'react-select';
import ReactPaginate from 'react-paginate';



function MisDesafios({misdesafios, getmisdesafios}) {
  const [state, setState] = useState({ estado:"", orden:"" });

  //-----paginacion-----//
  const [pageNumber, setPageNumber] = useState(0);
  const desafiosPerPage = 5;
  const pagesVisited = pageNumber*desafiosPerPage;
  const displayDesafios = misdesafios.slice( pagesVisited , pagesVisited + desafiosPerPage );
  const pageCount = Math.ceil(misdesafios.length/desafiosPerPage);

  const changePage = ({selected})=>{
    setPageNumber(selected)
  }
  //--------------------//

  useEffect(async ()=>{
    await getmisdesafios(state)
  }, []);

  const estados = [
    {value:"programados", label:"Programados"},
    {value:"activos", label:"Activos"},
    {value:"finalizados", label:"Finalizados"}
  ]
  
  const orden = [
    {value:"asc", label:"Ascendente"},
    {value:"dec", label:"Descendente"},
  ]

  function handleChangeEstado(e,name){

    if(e){
      console.log({
        ...state,
        [name]:e.value
      })

      getmisdesafios({
        ...state,
        [name]: e.value
      })
      setState({
        ...state,
        [name]: e.value
      })

    }else{
      console.log({
        ...state,
        [name]:""
      })

      getmisdesafios({
        ...state,
        [name]: ""
      })
      setState({
        ...state,
        [name]: ""
      })
    }

  }
  
  return (

      <div id="conteiner-lista-misdesafios-cliente" >

        <div id="nav-conteiner-filtros-ordenamiento" >
            <Select
              options={estados}
              placeholder="Filtrar x Estado..."
              onChange={(e)=>{handleChangeEstado(e,"estado")}}
              isClearable={true}
            />
          <div>
            <Select
              options={orden}
              placeholder="Ordenar x Fecha..."
              onChange={(e)=>{handleChangeEstado(e, "orden")}}
              isClearable={true}
            /> 
          </div>
        </div>
        <div className="desafio-lista-misdesafios-cliente" >
          <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" >Desafío</p> </div>
          <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" >Fecha Inicio</p> </div>
          <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" >Fecha Fin</p> </div>
          <div className="conteiner-img-desafio" ></div>
        </div>

        <div id="conteiner-lista-desafios-2-cliente" >
            {
              misdesafios ?
              displayDesafios.map((desafio)=> <Desafio desafio={desafio} ></Desafio> )
              :
                <p>Cargando...</p>
            }
        </div>

          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginarionDisabled"}
            activeClassName={"paginationActive"}
          />

      </div>

    
  );
}

const mapStateToProps = function(state) {
  return {
    misdesafios: state.misdesafios 
  }
}

const mapDispatchToProps = function(dispatch){
  return{
    getmisdesafios: (obj)=>{dispatch(getMisDesafios(obj))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MisDesafios);

// import React, {useState, useEffect} from 'react';
// import { connect } from 'react-redux';
// import {getMisDesafios} from "../../../Redux/actions";
// import "./misdesafios.css"
// import Desafio from "./desafio/desafio";
// import Select from 'react-select';

// function MisDesafios({misdesafios, getmisdesafios}) {

//   useEffect(async ()=>{
//     await getmisdesafios()
//   }, []);

//   const estados = [
//     {value:"programados", label:"programados"},
//     {value:"avtivos", label:"avtivos"},
//     {value:"finalizados", label:"finalizados"}
//   ]
//   return (
//     <div id="conteiner-lista-misdesafios-cliente" >

//       <div  >
//           <Select
//             options={estados}
//           />
//         <div>
//           <Select
//             options={}
//           />
//         </div>
//       </div>

//       <div className="desafio-lista-misdesafios-cliente" >
//         <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" >Desafío</p> </div>
//         <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" >Fecha Inicio</p> </div>
//         <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" >Fecha Fin</p> </div>
//         <div className="conteiner-img-desafio" ></div>
//       </div>

//         {
//           misdesafios ?
//             misdesafios.map((desafio)=> <Desafio desafio={desafio} ></Desafio> )
//           :
//             <p>Cargando...</p>
//         }
//     </div>
//   );
// }

// const mapStateToProps = function(state) {
//   return {
//     misdesafios: state.misdesafios
//   }
// }

// const mapDispatchToProps = function(dispatch){
//   return{
//     getmisdesafios: ()=>{dispatch(getMisDesafios())},
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MisDesafios);

