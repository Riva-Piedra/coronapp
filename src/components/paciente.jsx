import React from "react";

const Paciente = (props) => {

    

    const handleClick = async e => {
        await props.toggle()
        const modal = document.getElementById("modal")
        let array = Array.from(e.target.parentElement.childNodes);
        let newArray = []
        array.forEach(element => {
            newArray.push(element.innerText)
        });
        for (let i = 0; i <= newArray.length + 2; i++) {
            if(i % 2 !== 0){
                modal.childNodes[i].value = newArray[Math.round(i / 2) -1]
            }
        }
    }

    return(
            <tr key ={props.id}>
                <th>{props.id}</th>
                <th>{props.DNI}</th>
                <th>{props.nombre}</th>
                <th>{props.apellido}</th>
                <th>{props.edad}</th>
                <th>{props.grupo}</th>
                <th className="edit" onClick={handleClick}>Editar</th>
            </tr>
    )
}


export default Paciente;