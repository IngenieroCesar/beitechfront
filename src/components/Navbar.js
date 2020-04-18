import React from 'react'
import { render } from '@testing-library/react'

//Función nav bar que resive como props los links:
function Navbar(props){
    return(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav">
                {
                    // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                    props.vinculos.map((vinculo) => {
                        return(
                            <li className="nav-item active">
                            <a className="nav-link" href={vinculo.link} >{vinculo.nombre}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )

}

export default Navbar