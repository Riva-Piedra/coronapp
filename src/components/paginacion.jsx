import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../services/config";  

const Paginacion = (props) => {

    const[total, setTotal] = useState()

    useEffect(() => {
        axios.get(url + "/pacientes?total").then(res => setTotal(res.data))
        .catch(e => console.log(e.response.data))
    })

    return(
    <div className="control" id="controls">
        {props.pagina < total/5 ? <button onClick= {props.siguiente} className="control-button">Siguiente</button> : null}
        {props.pagina > 1 ? <button onClick= {props.anterior} className="control-button">Anterior</button>: null}
    </div>
    )
}

export default Paginacion