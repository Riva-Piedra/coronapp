import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { url } from "../services/config";
import axios from 'axios';


    const Formlogin = () => {
    

        const [user, setUser] = useState('');
        const [pass, setPass] = useState('');
        const [error, setError] = useState({
            error : false,
            error_msj: ""});
        const history = useHistory();
        
            
        const handleUser = e => setUser(e.target.value)
        const handlePass = e => setPass(e.target.value)

        const Timeout = () => setTimeout(() => {
            setError({
              error : false,
              error_msj: ""})
        }, 2000);

        const handleSubmit =  e => {
            e.preventDefault();
            axios.post(url + "/auth", {
                "usuario" : user,
                "pass": pass
            }, { headers : { "Content-Type": "text/plain;charset=UTF-8" }
            }).then(res => { if(res) {
                    localStorage.setItem("token", res.data.token)
                    history.push("/dashboard")}
                }
            ).catch(e => {
                if(e.response){
                setError({
                error: true, 
                error_msj: e.response.data.result.error_msg})} 
                Timeout()})
        } 

        return ( 
            <form className="login" onSubmit = {handleSubmit}>
                <h1>Bienvenido Usuario!</h1>
                <p> Inicio de Sesion</p>

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

                <button> Ingresar </button>
                <p>¿No tienes cuenta? <Link to="/registro"> Registrate</Link></p> 

                {error.error ? <div className="error"> {error.error_msj}</div> : null}      
            </form>
        )
}

export default Formlogin;