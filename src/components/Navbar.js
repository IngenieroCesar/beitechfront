import React from 'react'


//Función nav bar que resive como props los links:
class Navbar extends React.Component{
    state = {
        session: "",
        hidden: false
    }

    // Eliminamos el token de neustra variable global
    eliminarToken = async e => {
        localStorage.setItem('token', 0)
        //Redireccionamos hacia la vista
        
        this.setState({
            //ocultamos el boton de cerrar sesión
            hidden: true
          })
    }
    

    render(){

        const {vinculos} = this.props
        return(
            <nav className="navbar navbar-expand-sm justify-content-between bg-dark navbar-dark">
                <ul className="navbar-nav">
                    {
                        // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                        vinculos.map((vinculo) => {
                            return(
                                <li className="nav-item active" key= {vinculo.nombre}>
                                <a className="nav-link" href={vinculo.link} >{vinculo.nombre}</a>
                                </li>
                            )
                        })
                    }
                </ul>
                {/* //Generamos un boton para cerrar seción que activa la función correspondiente */}
                <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <ul className="navbar-nav text-right">
                        <li className="nav-item active" hidden={this.state.hidden}>
                            <a href="/login" className="nav-link" onClick={this.eliminarToken}>Cerrar Sesion</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }




}

export default Navbar