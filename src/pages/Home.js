import React from 'react'
import Navbar from '../components/Navbar'


class Home extends React.Component {

    state = {
        links : [
            {
            'nombre': 'Perfil', 
            'link': '/perfil'
            },
            {
            'nombre': 'Productos', 
            'link': '/productos'
            },
            {
            'nombre': 'Ordenes', 
            'link': '/ordenes'
            }
        ]
    }


//comprobamos la sesión iniciada con el token en nuestra variable global
    componentDidMount(){
        if(localStorage.token == 0){
            this.props.history.push('/login')
        }
    }

    eliminarToken(){
        localStorage.setItem('token', 0)
    }

    render(){

        return(
            <div>
                <Navbar 
                    vinculos= {this.state.links}
                />
            <h1>Hello home</h1>
            <a href="" onClick={this.eliminarToken}>Cerrar Sesión</a>
            </div>
            
        )
    }

}

export default Home