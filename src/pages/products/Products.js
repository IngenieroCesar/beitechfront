import React from 'react'
import Navbar from '../../components/Navbar'
import ListProducts from '../../components/ListProducts'

class Products extends React.Component{

    state = {
        links : [
            {
            'nombre': 'Perfil', 
            'link': '/perfil'
            },
            {
            'nombre': 'Home', 
            'link': '/'
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

            <ListProducts                     
               
            />                          

        </React.Fragment>
        )
    }
}

export default Products