import React from 'react'
import ReactDom from 'react-dom'
import UrlService from '../services/UrlService'
import SearchOrders from '../components/SearchOrders'

//styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCogs } from '@fortawesome/free-solid-svg-icons'


class ListUsers extends React.Component {

    //le pasamos el token a el estado de nuestro componente
    state = {
        data: [],
        token: localStorage.token,
    }

    

    async componentDidMount(){
        await this.fetchUsers()
        // console.log(this.state.token)
    }

    fetchUsers = async () => {
        try {          
            //Creamos un objeto de configuración para enviar al API  
            let config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token
                }
            }
            //Hacemos SOLICITUD al API
            let res = await fetch(UrlService.usersUrl(), config)
            //convertimos la respuesta
            let data = await res.json()
            console.log(data)
            //Usamos nuestro state para renderizar la informacíon
            this.setState({
                //Persistimos los datos en el estado del componente
                data
            })
            
        } catch (error) {
            console.log(error)
        }
    }




    render(){

        const users = this.state.data
        return(
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Users</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm">
                                            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />

                                            <div className="input-group-append">
                                            <button type="submit" className="btn btn-default"><i className="fas fa-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover tUploadext-nowrap">
                                        <thead>
                                            <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>                    
                                            {
                                                // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                                                users.map((user) => {
                                                    return(
                                                        <tr>
                                                        <th>{user.id}</th>
                                                        <th>{user.name}</th>
                                                        <th>{user.email}</th>
                                                        <th>
                                                            <SearchOrders
                                                                userId={user.id}
                                                                showModalEdit = {this.showModalEdit}
                                                                onChange={this.handleChange} 
                                                                onSubmit={this.handleSubmit}
                                                            />
                                                        </th>
                                                        </tr>      
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>        
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default ListUsers