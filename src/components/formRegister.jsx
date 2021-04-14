import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { url } from "../services/config";
import axios from 'axios';


    const Register = () => {

        
        const [user, setUser] = useState('');
        const [pass, setPass] = useState('');
        const [validate, setValidate] = useState('');
        const [error, setError] = useState({
            error : false,
            error_msj: ""})

                                
        const handleUser = e => setUser(e.target.value)
        const handlePass = e => setPass(e.target.value)
        const handleValidate = e => setValidate(e.target.value)
        let history = useHistory();

        const Timeout = () => setTimeout(() => {
            setError({
            error : false,
            error_msj: ""})
            }, 2000);

        const handleSubmit = e => {
            e.preventDefault();
            axios.post(url + "/auth", {
                "usuario": user,
                "pass" : pass,
                "pass2" : validate
            },{ headers : { "Content-Type": "text/plain;charset=UTF-8" }}
            ).then(res => history.push("/login")).catch(e => {
                if(e.response){
                    setError({
                        error: true,
                        error_msj: e.response.data.result.error_msg
                    })
                    Timeout()
                } 
            })
        } 
        

        return (
            <form className="login" onSubmit = {handleSubmit}>
                <h1>Bienvenido</h1>
                <p> Registro de Usuario </p>

                <label htmlFor="usuario">Usuario</label>
                <input type="text" 
                placeholder="Usuario" 
                value={user}
                name="usuario" 
                id="usuario"
                onChange = {handleUser}></input>

                <label htmlFor="pass">Constraseña</label>
                <input type="password" 
                placeholder="Constraseña"
                value={pass} 
                name="pass" 
                id="pass"
                onChange = {handlePass}></input>

                <label htmlFor="pass">Repetir Constraseña</label>
                <input type="password" 
                placeholder="Repetir Constraseña"
                value={validate} 
                name="pass2" 
                id="pass2"
                onChange = {handleValidate}></input>

                <button>  Registarse </button> 

                <p>Ya tienes cuenta? <Link to="/"> Inicia Sesión </Link></p>
                
                {error.error ? <div className="error">{ error.error_msj }</div> : null}      
            </form>    
        )
}

export default Register;