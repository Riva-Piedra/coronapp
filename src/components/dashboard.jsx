import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Paciente from "./paciente";
import Modal from "./Modal";
import Paginacion from "./paginacion";
import { url } from "../services/config";

const Dashboard = () => {

    const history = useHistory();
/////////////////////////////////////////////////////
    const [pagina, setPagina] = useState(1);
    const siguiente = () => setPagina(pagina + 1)
    const anterior = () => setPagina(pagina - 1)
/////////////////////////////////////////////////////
    const [modal, toggleModal] = useState(false);
    const toggle = () => toggleModal(true);
    const close = () => toggleModal(false);
/////////////////////////////////////////////////////
    const [pacientes, setPacientes] = useState([]);
    const controls = document.getElementById("controls")
    const DNI = document.getElementById("DNI")
    const busquedaDni = () => {
        axios.get(url + `/pacientes?id=${DNI.value}`).then(async res => {
            if(await res.data){
                setPacientes([res.data])
                controls.style.visibility = "hidden"
            }
        }).catch(e => {
            setError({
                error:true,
                error_msj:e.response.data.result.error_msg
            })
        }, Timeout())
    }
/////////////////////////////////////////////////////   
    const [error, setError] = useState({
        error : false,
        error_msj: ""});

    const Timeout = () => setTimeout(() => {
        setError({
            error : false,
            error_msj: ""})
    }, 2000);
/////////////////////////////////////////////////////
    const token = localStorage.getItem("token");
/////////////////////////////////////////////////////
    const init = useCallback(() => {
        axios.post(url + "/auth", {}, 
        { headers : { 
            "Content-Type": "text/plain;charset=UTF-8",
            'Authorization': token}
        }).then(async res => { 
            if(await res.data){
                axios.get(url + `/pacientes?pagina=${pagina}`).then(res => {
                if(res.data){
                    setPacientes(res.data)
                }}
                ).catch(e => setError({
                    error:true,
                    error_msj:e.response.data.result.error_msg
                }), Timeout())
            }
        }).catch(e => {
            if(e.response.data) 
            history.push("/") 
            localStorage.removeItem("token")})
    }, [history, pagina, token])
/////////////////////////////////////////////////////
    useEffect(() => {
        init()
    }, [init])
/////////////////////////////////////////////////////
    return (
        <div className = "pacientes">
            <nav className="nav">
                <label>Busqueda por DNI</label>
                <input type="number" name="dni" id="DNI" className="input"></input>
                <button onClick={busquedaDni}  className="search">Buscar</button>
            </nav>      
        <table>
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Documento</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Grupo</th>
                </tr>
                {pacientes.map(item => <Paciente
                    key = {item.ID} 
                    id = {item.ID}
                    DNI = {item.DNI}
                    nombre = {item.nombre}
                    apellido = {item.apellido}
                    edad = {item.edad}
                    grupo = {item.grupo}
                    toggle = {toggle}
                /> )}
            </tbody>
        </table>
            <Paginacion
                pagina = {pagina}
                siguiente={siguiente}
                anterior={anterior}
            />
            
            {error.error ? <div className="error"> {error.error_msj}</div> : null} 

            {modal && <Modal close={close} init={init}/>}           
        </div>
    )
}

export default Dashboard;