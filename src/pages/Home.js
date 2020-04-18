import React from 'react'
import Navbar from '../components/Navbar'
import ListUsers from '../components/ListUsers'


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

    render(){

        return(
            <React.Fragment>

                <Navbar                     
                    vinculos= {this.state.links}
                />                       

                <ListUsers
                
                />




            </React.Fragment>

            
        )
    }

}

export default Home