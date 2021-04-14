import axios from "axios";
import { url } from "../services/config";
import React, { useEffect, useState } from "react";  

    const Modal = (props) => {

        const [id, setId] = useState(0);
        const [DNI, setDni] = useState(0);
        const [nombre, setNombre] = useState("");
        const [apellido, setApellido] = useState("");
        const [edad, setEdad] = useState(0) 
        const [error, setError] = useState({
            error : false,
            error_msj : ""
        })
        const Timeout = () => setTimeout(() => {
            setError({
                error : false,
                error_msj: ""})
        }, 2000);
        const token = localStorage.getItem("token")

        useEffect(() => {
            const ID = document.getElementById("id")
            const dni = document.getElementById("dni")
            const name = document.getElementById("nombre")
            const lastname = document.getElementById("apellido")
            const age = document.getElementById("edad")
            setId(ID.value)
            setDni(dni.value)
            setNombre(name.value)
            setApellido(lastname.value)
            setEdad(age.value)
        }, [])

        const close = () => {
            props.close()
            setError({
                error:false,
                error_msj: ""
            })
        }

        const handleDni = e => setDni(e.target.value)
        const handleName = e => setNombre(e.target.value)
        const handleLastname = e => setApellido(e.target.value)
        const handleAge = e => setEdad(e.target.value)
            

        const click = () => {
            const dni = document.getElementById("dni")
            const age = document.getElementById("edad")
            if(dni.validationMessage !== "" || age.validationMessage !== ""){
                setError({
                    error: true,
                    error_msj: "Inserte valores numericos"
                }) 
            } else {
                axios.put(url + "/pacientes", {
                    "id": id,
                    "DNI" : DNI,
                    "nombre": nombre,
                    "apellido": apellido,
                    "edad": edad
                }, { headers : 
                    { "Content-Type": "text/plain;charset=UTF-8", 
                    'Authorization': token}}
            ).then(res => {
                if(res.data){
                    console.log(res.data)
                    props.close()
                    props.init()
                } 
            }).catch(e =>{
                if(e.response){
                    setError({
                        error: true,
                        error_msj : e.response.data.result.error_msg
                    })
                }
            }, Timeout())
        }
    }

        return (
            <div id ="modal" className="modal">
                <label>ID</label>
                <input name="id" id="id" readOnly></input>
                <label>DNI</label>       
                <input type="number" required name="DNI" min="0" id="dni" onChange={handleDni}></input>
                <label>Nombre</label>
                <input type="text" name="nombre" id="nombre" onChange={handleName}></input>
                <label>Apellido</label>
                <input type="text" name="apellido" id="apellido" onChange={handleLastname}></input>
                <label>Edad</label>
                <input type="number" required name="edad" min="0" max="120" id="edad" onChange={handleAge}></input>
                <div className="control">                        
                    <button className="button" onClick={click}> Listo </button>
                    <button className="button" onClick={close}> Cerrar </button>
                </div> 
                {error.error ? <div className="error"> {error.error_msj}</div> : null} 
            </div>
        )
    }

export default Modal
